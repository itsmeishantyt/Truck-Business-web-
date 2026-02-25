import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[var(--color-border)] overflow-hidden">
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

                {/* CTA Banner */}
                <div className="relative mb-16 rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] p-10 md:p-14 text-center">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
                    <div className="relative z-10">
                        <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-3">Ready to Drive?</p>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mb-4" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}>
                            Start Your Application Today
                        </h3>
                        <p className="text-[var(--color-muted)] mb-8 max-w-lg mx-auto">
                            Join 500+ drivers who have already found a better career with N&Z Logistics LLC.
                        </p>
                        <Link href="/apply-form/index.html" className="btn-primary text-base px-8 py-3.5 inline-flex">
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Footer columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex mb-5 hover:opacity-80 transition-opacity hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                            <img src="/logo.webp" alt="N&Z Logistics LLC" className="h-10 w-auto" />
                        </Link>
                        <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-xs">
                            Delivering excellence and opportunity across the nation. Built on trust, driven by experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-5">Navigation</p>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/apply-form/index.html', label: 'Apply for a Job' },
                                { href: '/about', label: 'About Us' },
                                { href: '/faq', label: 'FAQ' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[var(--color-muted)] text-sm hover:text-[var(--color-text)] transition-colors font-medium">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-5">Get in Touch</p>
                        <ul className="space-y-4">
                            {[
                                { Icon: Mail, text: 'nzlogisticsllc@gmail.com' },
                                { Icon: Phone, text: '+1 (555) 000-0000' },
                                { Icon: MapPin, text: '123 Logistics Way, TX 00000' },
                            ].map(({ Icon, text }) => (
                                <li key={text} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[var(--color-surface3)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-[var(--color-muted)]" />
                                    </div>
                                    <span className="text-[var(--color-muted)] text-sm">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
                    <p>© {currentYear} N&Z Logistics LLC. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">Built with <span className="text-[var(--color-text)]">♥</span> using Next.js</p>
                </div>
            </div>
        </footer>
    );
}
