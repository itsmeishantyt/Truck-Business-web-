import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Instagram } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us — N&Z Logistics LLC',
    description: 'Get in touch with the N&Z Logistics LLC recruitment team.',
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Contact <span className="text-orange-400">Us</span>
                </h1>
                <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
                    Have questions before applying? We&apos;re happy to help. Reach out to our recruiting team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div className="space-y-5">
                    {[
                        { icon: <Mail className="w-5 h-5 text-orange-400" />, label: 'Email', value: 'nzlogisticsllc@gmail.com', href: 'mailto:nzlogisticsllc@gmail.com' },
                        { icon: <Phone className="w-5 h-5 text-orange-400" />, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                        { icon: <MapPin className="w-5 h-5 text-orange-400" />, label: 'Address', value: '123 Logistics Way\nDallas, TX 00000', href: undefined },
                        { icon: <Clock className="w-5 h-5 text-orange-400" />, label: 'Office Hours', value: 'Mon – Fri: 8am – 5pm CST', href: undefined },
                    ].map((item) => (
                        <div key={item.label} className="card flex items-start gap-4">
                            <span className="shrink-0 mt-0.5">{item.icon}</span>
                            <div>
                                <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-[var(--color-text)] hover:text-orange-400 transition-colors font-medium">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-[var(--color-text)] font-medium whitespace-pre-line">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Card */}
                <div className="card bg-gradient-to-br from-orange-900/20 to-slate-800 border-orange-500/20 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">Applying for a position?</h2>
                    <p className="text-[var(--color-muted)] mb-5 leading-relaxed">
                        The fastest way to get started is to fill out our online application form. Our
                        recruitment team reviews every application within 3–5 business days.
                    </p>
                    <a href="/apply" className="btn-primary inline-flex">
                        Go to Application Form →
                    </a>
                </div>
            </div>

            {/* Social */}
            <div className="mt-10 card text-center">
                <p className="text-[var(--color-muted)] text-sm mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-4">
                    {[
                        { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: '#' },
                        { label: 'Facebook', icon: <Facebook className="w-4 h-4" />, href: '#' },
                        { label: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: '#' },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface2)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors text-sm"
                        >
                            <span>{s.icon}</span>{s.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
