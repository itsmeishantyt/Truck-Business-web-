import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const applicationSchema = z
    .object({
        // ── Personal Information ──────────────────────────────────────────────
        firstName: z
            .string()
            .min(1, 'First name is required')
            .max(50, 'First name is too long'),
        lastName: z
            .string()
            .min(1, 'Last name is required')
            .max(50, 'Last name is too long'),
        ssn: z
            .string()
            .regex(
                /^\d{3}-?\d{2}-?\d{4}$/,
                'Enter a valid SSN (e.g. 123-45-6789)'
            ),
        dateOfBirth: z
            .string()
            .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Enter date as MM/DD/YYYY'),

        // ── Address ───────────────────────────────────────────────────────────
        streetAddress1: z
            .string()
            .min(5, 'Street address is required')
            .max(200),
        country: z.string().min(1, 'Country is required'),
        city: z.string().min(1, 'City is required').max(100),
        state: z.string().min(1, 'State/Province is required'),
        zipCode: z
            .string()
            .min(3, 'Zip/Postal code is required')
            .max(20),
        livedAtAddress3PlusYears: z.union(
            [z.literal('yes'), z.literal('no')],
            { error: 'Please indicate if you have lived at this address for 3+ years' }
        ),

        // ── Contact ───────────────────────────────────────────────────────────
        primaryPhone: z
            .string()
            .regex(/^[+\d\s\-().]{7,20}$/, 'Enter a valid phone number'),
        email: z.string().email('Enter a valid email address'),
        confirmEmail: z.string().email('Enter a valid email address'),

        // ── Position ──────────────────────────────────────────────────────────
        position: z.string().min(2, 'Please select a position'),
    })
    .refine((data) => data.email === data.confirmEmail, {
        message: "Email addresses don't match",
        path: ['confirmEmail'],
    });

export type ApplicationFormData = z.infer<typeof applicationSchema>;

// File validation (used separately — File objects can't be in Zod schema)
export function validateResumeFile(file: File | null): string | null {
    if (!file) return 'Please upload your resume (PDF)';
    if (file.type !== 'application/pdf') return 'Resume must be a PDF file';
    if (file.size > MAX_FILE_SIZE) return 'Resume must be smaller than 5 MB';
    return null;
}
