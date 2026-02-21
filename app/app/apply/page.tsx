import type { Metadata } from 'next';
import ApplyForm from '@/components/ApplyForm';

export const metadata: Metadata = {
    title: 'Apply Now — TruckCo Careers',
    description: 'Submit your job application to TruckCo. We review every application within 3–5 business days.',
};

export default function ApplyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-5">
                    📝 Application Form
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Apply to <span className="text-orange-400">TruckCo</span>
                </h1>
                <p className="text-slate-400 text-base max-w-xl mx-auto">
                    Thank you for your interest in TruckCo. To apply for a driving position, please complete
                    the form below. Incomplete information will delay the processing of your application.
                </p>
            </div>

            {/* ── Requirements ──────────────────────────────────────── */}
            <div className="card mb-6 border-orange-500/20 bg-orange-500/5">
                <h2 className="font-semibold text-orange-400 mb-3">✅ To qualify, you must meet:</h2>
                <ul className="space-y-1.5 text-sm text-slate-300">
                    {[
                        'Min 2 years verifiable driving experience',
                        'Clean PSP record',
                        'No more than 2 points on MVR',
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                            <span className="text-green-400">✓</span> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── What you'll need ─────────────────────────────────── */}
            <div className="card mb-8">
                <h2 className="font-semibold text-white mb-3">📋 Before you start, have the following ready:</h2>
                <ul className="space-y-1.5 text-sm text-slate-400">
                    {[
                        'Social Security Number (SSN)',
                        'Home address history for the past 3 years',
                        'Current driver license number and driver license history for the past 3 years',
                        'Employment history up to 10 years',
                        'History of traffic accidents, violations and/or convictions from the last 3 years (including DUI or reckless driving conviction and license suspension)',
                        'Military history (if applicable)',
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                            <span className="text-orange-400 mt-0.5 shrink-0">•</span> {item}
                        </li>
                    ))}
                </ul>
                <p className="text-xs text-slate-500 mt-4">
                    In compliance with Federal and State equal employment opportunity laws, qualified applicants
                    are considered for all positions without regard to race, color, religion, sex, national origin,
                    age, marital status, veteran status, non-job related disability, or any other protected group status.
                </p>
            </div>

            {/* Security assurance */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">🔐 Secure &amp; encrypted</span>
                <span className="flex items-center gap-1.5">🚫 No spam, ever</span>
                <span className="flex items-center gap-1.5">📄 PDF resumes only</span>
                <span className="flex items-center gap-1.5">⚡ Takes ~5 minutes</span>
            </div>

            {/* Form card */}
            <div className="card">
                <ApplyForm />
            </div>
        </div>
    );
}
