import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Instagram } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us — N&Z Logistics LLC',
    description: 'Get in touch with the N&Z Logistics LLC recruitment team.',
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">

            {/* Header */}
            <div className="text-center mb-12 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />
                <span className="eyebrow mb-4">Reach Out</span>
                <h1 className="section-heading text-4xl md:text-5xl mt-4 mb-4 text-[var(--color-text)]">
                    Contact <span className="gradient-text">Us</span>
                </h1>
                <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
                    Have questions before applying? We&apos;re happy to help. Reach out to our recruiting team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Contact Details */}
                <div className="space-y-4">
                    {[
                        { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'nzlogisticsllc@gmail.com', href: 'mailto:nzlogisticsllc@gmail.com' },
                        { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                        { icon: <MapPin className="w-4 h-4" />, label: 'Address', value: '123 Logistics Way\nDallas, TX 00000', href: undefined },
                        { icon: <Clock className="w-4 h-4" />, label: 'Office Hours', value: 'Mon – Fri: 8am – 5pm CST', href: undefined },
                    ].map((item) => (
                        <div key={item.label} className="card flex items-start gap-4 hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 transition-all duration-300 group">
                            <div className="w-9 h-9 rounded-xl bg-[var(--color-surface3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] transition-all">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-[var(--color-text)] hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-all font-medium">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-[var(--color-text)] font-medium whitespace-pre-line">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Card */}
                <div className="card relative overflow-hidden border-[var(--color-border-strong)] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">Applying for a position?</h2>
                        <p className="text-[var(--color-muted)] mb-6 leading-relaxed text-sm">
                            The fastest way to get started is to fill out our online application form. Our
                            recruitment team reviews every application within 3–5 business days.
                        </p>
                        <a href="/apply-form/index.html" className="btn-primary inline-flex text-sm">
                            Go to Application Form →
                        </a>
                    </div>
                </div>
            </div>

            {/* Social */}
            <div className="mt-8 card text-center">
                <p className="text-[var(--color-muted)] text-sm mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-3">
                    {[
                        { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: '#' },
                        { label: 'Facebook', icon: <Facebook className="w-4 h-4" />, href: '#' },
                        { label: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: '#' },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface2)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all text-sm font-medium"
                        >
                            {s.icon}{s.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
