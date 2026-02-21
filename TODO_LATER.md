# TODO — Features to Add Later

A running list of features, integrations, and security measures that are deferred from the initial build.

---

## 🔐 Security

### 1. CAPTCHA — Cloudflare Turnstile
- **Why**: Prevents automated/bot form submissions on the `/apply` page.
- **Steps**:
  1. Create a Cloudflare account → go to **Turnstile** → Add a site
  2. Add your domain (e.g., `yourcompany.com` and `localhost` for dev)
  3. Get your **Site Key** (public) and **Secret Key** (private)
  4. Add to `.env.local`:
     ```
     NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
     TURNSTILE_SECRET_KEY=your-secret-key
     ```
  5. Install widget: `npm install @marsidev/react-turnstile`
  6. Add `<Turnstile siteKey={...} />` to the Apply form page
  7. In the Server Action (`submitApplication.ts`), verify the token:
     ```ts
     const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
       method: 'POST',
       body: new URLSearchParams({
         secret: process.env.TURNSTILE_SECRET_KEY!,
         response: turnstileToken,
       }),
     });
     const data = await res.json();
     if (!data.success) throw new Error('CAPTCHA failed');
     ```
  - **Placeholder**: A comment `// TODO: Verify Turnstile token here` exists in `app/actions/submitApplication.ts`

---

## 📧 Email Notifications

### 2. Admin Email on New Application
- **Why**: Notify admin every time a new application is submitted.
- **Options**: Resend, SendGrid, or Supabase Edge Functions with SMTP
- **Steps**: Set up chosen email provider, add a call in `submitApplication.ts` after successful DB insert.

### 3. Applicant Confirmation Email
- **Why**: Acknowledge receipt to the applicant.
- **Steps**: Same email provider; send to `application.email` after insert.

---

## ⚡ Rate Limiting Upgrade

### 4. Upstash Redis Rate Limiting
- **Why**: The current in-memory rate limiter resets on server restarts and doesn't work across multiple serverless instances.
- **Steps**:
  1. Create an [Upstash Redis](https://upstash.com) database (free tier)
  2. `npm install @upstash/ratelimit @upstash/redis`
  3. Replace the in-memory limiter in `lib/rateLimit.ts` with Upstash client

---

## 🧑‍💼 Admin Enhancements

### 5. Application Export (CSV)
- Add a "Download CSV" button in the admin dashboard that exports all applications.

### 6. Admin Notes / Comments
- Add a `notes` TEXT field to the `applications` table and a textarea in the admin detail view.

### 7. Search & Advanced Filtering
- Add search by name/email and filter by date range in the admin applications list.

---

## 🌐 Deployment

### 8. Transfer from Netlify → Hostinger
- Set up Node.js app hosting on Hostinger
- Update environment variables in Hostinger control panel
- Point custom domain DNS to Hostinger
- Configure `next.config.ts` output if needed (standalone mode)
