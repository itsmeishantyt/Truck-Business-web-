import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ — N&Z Logistics LLC Careers',
    description: 'Frequently asked questions about applying for a job at N&Z Logistics LLC.',
};

const faqs = [
    {
        q: 'What positions are currently available?',
        a: 'We are currently hiring OTR Truck Drivers (Class A CDL), Local Delivery Drivers, Warehouse & Logistics Associates, and Dispatch Coordinators. New positions are added regularly.',
    },
    {
        q: 'Do I need a CDL to apply?',
        a: 'A CDL is required for driving positions (OTR and Local Delivery). However, our warehouse and dispatch roles do not require a CDL. We also offer sponsored CDL training for qualified candidates.',
    },
    {
        q: 'How do I submit my application?',
        a: "Click \"Apply Now\" on any page to reach our application form. Fill in your details, upload your resume as a PDF (max 5 MB), and hit submit. You'll receive a confirmation once we've received it.",
    },
    {
        q: 'How long does the hiring process take?',
        a: "Our recruiting team reviews all applications within 3–5 business days. If shortlisted, you'll be contacted for a phone screen, followed by a final interview.",
    },
    {
        q: 'What documents do I need to apply?',
        a: "For the online application, you only need your resume (PDF). If you progress to later stages, we'll request your CDL, driving record, and references at that point.",
    },
    {
        q: 'Is there a file type requirement for my resume?',
        a: 'Yes — we only accept PDF files, maximum 5 MB. This ensures your formatting is preserved when our team reviews it.',
    },
    {
        q: 'What benefits do you offer?',
        a: 'We offer competitive pay, a comprehensive benefits package (medical, dental, vision), paid time off, performance bonuses, and career advancement opportunities.',
    },
    {
        q: 'Are there remote or work-from-home opportunities?',
        a: 'Our Dispatch Coordinator role is available remotely. Most other positions are on-site or on-road by nature.',
    },
];

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">

            {/* Header */}
            <div className="text-center mb-12 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />
                <span className="eyebrow mb-4">Support</span>
                <h1 className="section-heading text-4xl md:text-5xl mt-4 mb-4 text-[var(--color-text)]">
                    Frequently Asked <span className="gradient-text">Questions</span>
                </h1>
                <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
                    Everything you need to know about applying for a position at N&Z Logistics LLC.
                </p>
            </div>

            {/* FAQ list */}
            <div className="space-y-3" id="faq-list">
                {faqs.map((faq, i) => (
                    <details
                        key={i}
                        className="card group open:border-[var(--color-border-strong)] open:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-200 cursor-pointer"
                    >
                        <summary className="flex items-center justify-between font-semibold text-[var(--color-text)] list-none py-1 select-none gap-4">
                            <span>{faq.q}</span>
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-surface3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] text-sm transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>
                        <p className="text-[var(--color-muted)] leading-relaxed mt-3 pt-3 border-t border-[var(--color-border)] text-sm">
                            {faq.a}
                        </p>
                    </details>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-10 card text-center relative overflow-hidden border-[var(--color-border-strong)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]" />
                <div className="relative z-10">
                    <p className="text-[var(--color-text)] font-semibold mb-2">Still have questions?</p>
                    <p className="text-[var(--color-muted)] text-sm mb-5">Our team is happy to help via email or phone.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="/contact" className="btn-secondary text-sm">Contact Us</a>
                        <a href="/apply-form/index.html" className="btn-primary text-sm">Apply Now →</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
