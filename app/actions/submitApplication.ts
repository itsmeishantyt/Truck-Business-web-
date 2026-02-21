'use server';

import { headers } from 'next/headers';
import { applicationSchema } from '@/lib/schemas';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendApplicantConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';


export type SubmitResult =
    | { success: true; message: string }
    | { success: false; error: string };

export async function submitApplication(formData: FormData): Promise<SubmitResult> {
    // Guard: if Supabase not configured, return friendly message
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return {
            success: false,
            error: 'Applications are not yet open. Please check back soon or call us at (313) 255-7827.',
        };
    }

    // 1. Get client IP for rate limiting
    const headersList = await headers();
    const ip =
        headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        headersList.get('x-real-ip') ??
        'unknown';

    // 2. Rate limit check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
        const minutes = Math.ceil(rateLimit.resetInMs / 60000);
        return {
            success: false,
            error: `Too many submissions. Please try again in ${minutes} minute${minutes !== 1 ? 's' : ''}.`,
        };
    }

    // TODO: Verify Cloudflare Turnstile CAPTCHA token here
    // See TODO_LATER.md for full integration steps.

    // 3. Extract and validate fields
    const rawData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        ssn: formData.get('ssn') as string,
        dateOfBirth: formData.get('dateOfBirth') as string,
        streetAddress1: formData.get('streetAddress1') as string,
        country: formData.get('country') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zipCode: formData.get('zipCode') as string,
        livedAtAddress3PlusYears: formData.get('livedAtAddress3PlusYears') as string,
        primaryPhone: formData.get('primaryPhone') as string,
        email: formData.get('email') as string,
        confirmEmail: formData.get('confirmEmail') as string,
        position: formData.get('position') as string,
    };

    const parsed = applicationSchema.safeParse(rawData);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data';
        return { success: false, error: firstError };
    }

    // 4. Validate resume file
    const resumeFile = formData.get('resume') as File | null;
    if (!resumeFile || resumeFile.size === 0) {
        return { success: false, error: 'Please upload your resume (PDF).' };
    }
    if (resumeFile.type !== 'application/pdf') {
        return { success: false, error: 'Resume must be a PDF file.' };
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
        return { success: false, error: 'Resume must be smaller than 5 MB.' };
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 5. Upload resume to Supabase Storage (private bucket: 'resumes')
    const timestamp = Date.now();
    const safeName = parsed.data.lastName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const resumePath = `${timestamp}_${safeName}.pdf`;
    const fileBuffer = await resumeFile.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(resumePath, fileBuffer, {
            contentType: 'application/pdf',
            upsert: false,
        });

    if (uploadError) {
        console.error('Resume upload error:', uploadError);
        return { success: false, error: 'Failed to upload resume. Please try again.' };
    }

    // 6. Insert application record (confirmEmail is NOT stored — validation only)
    const { data: inserted, error: insertError } = await supabaseAdmin
        .from('applications')
        .insert({
            first_name: parsed.data.firstName,
            last_name: parsed.data.lastName,
            ssn: parsed.data.ssn,
            date_of_birth: parsed.data.dateOfBirth,
            street_address_1: parsed.data.streetAddress1,
            country: parsed.data.country,
            city: parsed.data.city,
            state: parsed.data.state,
            zip_code: parsed.data.zipCode,
            lived_at_address_3plus_years: parsed.data.livedAtAddress3PlusYears === 'yes',
            primary_phone: parsed.data.primaryPhone,
            email: parsed.data.email,
            position: parsed.data.position,
            resume_path: resumePath,
            status: 'pending',
        })
        .select('id')
        .single();

    if (insertError) {
        console.error('DB insert error:', insertError);
        await supabaseAdmin.storage.from('resumes').remove([resumePath]);
        return { success: false, error: 'Failed to submit application. Please try again.' };
    }

    // 7. Send email notifications (fire-and-forget — never block the success response)
    const applicationId = inserted?.id ?? 'unknown';
    Promise.all([
        sendApplicantConfirmationEmail({
            to: parsed.data.email,
            firstName: parsed.data.firstName,
            position: parsed.data.position,
        }),
        sendAdminNotificationEmail({
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            email: parsed.data.email,
            position: parsed.data.position,
            applicationId,
        }),
    ]).catch((err) => console.error('Email send error (non-fatal):', err));

    return {
        success: true,
        message: "Thank you for applying! We'll review your application and reach out within 3–5 business days. A confirmation email has been sent to you.",
    };
}
