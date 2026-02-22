import { Resend } from 'resend';

// Resend client — created lazily at call time (env vars only needed at runtime)
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }
  return new Resend(apiKey);
}

const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'N&Z Logistics LLC Careers <noreply@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';

// ── Email: Applicant Confirmation ─────────────────────────────────────────────
export async function sendApplicantConfirmationEmail({
  to,
  firstName,
  position,
}: {
  to: string;
  firstName: string;
  position: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `We received your application — N&Z Logistics LLC`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application Received</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
    <!-- Header -->
    <div style="background:#ea580c;padding:28px 32px;">
      <p style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">🚛 N&Z Logistics LLC Careers</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <h1 style="color:#f1f5f9;font-size:20px;margin:0 0 12px;">Hi ${firstName},</h1>
      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Thank you for applying for the <strong style="color:#f97316;">${position}</strong> position at N&Z Logistics LLC.
        We've received your application and our team will review it shortly.
      </p>

      <div style="background:#0f172a;border-radius:10px;padding:18px 20px;border-left:3px solid #ea580c;margin:20px 0;">
        <p style="color:#f1f5f9;font-size:14px;margin:0 0 6px;font-weight:600;">What happens next?</p>
        <ul style="color:#94a3b8;font-size:14px;margin:0;padding-left:18px;line-height:1.8;">
          <li>Our team reviews your application and resume</li>
          <li>If you meet the requirements, we'll reach out within <strong style="color:#f1f5f9;">3–5 business days</strong></li>
          <li>A recruiter will contact you to schedule a phone screen</li>
        </ul>
      </div>

      <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:16px 0 0;">
        Have questions? Reply to this email or call us at <strong style="color:#f1f5f9;">(313) 255-7827</strong>.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;border-top:1px solid #334155;">
      <p style="color:#475569;font-size:12px;margin:0;text-align:center;">
        © 2026 N&Z Logistics LLC · This is an automated confirmation email.
      </p>
    </div>
  </div>
</body>
</html>`,
  });
}

// ── Email: Admin New Application Alert ────────────────────────────────────────
export async function sendAdminNotificationEmail({
  firstName,
  lastName,
  email,
  position,
  applicationId,
}: {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  applicationId: string;
}) {
  if (!ADMIN_EMAIL) return; // Skip silently if no admin email configured

  const resend = getResend();
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/applications/${applicationId}`;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `New Application: ${firstName} ${lastName} — ${position}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Application</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
    <div style="background:#0f172a;padding:20px 28px;border-bottom:1px solid #334155;">
      <p style="margin:0;color:#f97316;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">New Application Received</p>
      <p style="margin:4px 0 0;color:#f1f5f9;font-size:18px;font-weight:700;">${firstName} ${lastName}</p>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#64748b;font-size:13px;padding:7px 0;width:120px;">Position</td>
            <td style="color:#f1f5f9;font-size:13px;font-weight:600;">${position}</td></tr>
        <tr><td style="color:#64748b;font-size:13px;padding:7px 0;">Email</td>
            <td style="color:#f1f5f9;font-size:13px;">${email}</td></tr>
        <tr><td style="color:#64748b;font-size:13px;padding:7px 0;">App ID</td>
            <td style="color:#475569;font-size:11px;font-family:monospace;">${applicationId}</td></tr>
      </table>
      <a href="${adminUrl}" style="display:block;margin-top:20px;background:#ea580c;color:#fff;text-decoration:none;text-align:center;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;">
        View Application →
      </a>
    </div>
  </div>
</body>
</html>`,
  });
}
