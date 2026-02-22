import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Copyright } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--color-border)] mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4 hover:opacity-90 transition-opacity">
                            <img src="/logo.webp" alt="N&Z Logistics LLC" className="h-12 md:h-16 w-auto drop-shadow-sm" />
                        </Link>
                        <p className="text-[var(--color-text)] opacity-80 text-base leading-relaxed">
                            Delivering excellence across the nation. Join our growing team of professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-semibold text-[var(--color-text)] mb-3 text-base uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-base text-[var(--color-text)] opacity-80 font-medium flex flex-col items-center md:items-start">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/apply', label: 'Apply for a Job' },
                                { href: '/about', label: 'About Us' },
                                { href: '/faq', label: 'FAQ' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-orange-500 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-semibold text-[var(--color-text)] mb-3 text-base uppercase tracking-wider">Get in Touch</h4>
                        <ul className="space-y-3 text-base text-[var(--color-text)] opacity-80 font-medium flex flex-col items-center md:items-start">
                            <li className="flex items-center justify-center md:justify-start gap-3 w-full">
                                <Mail className="w-5 h-5 shrink-0 text-orange-500" />
                                <span>nzlogisticsllc@gmail.com</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3 w-full">
                                <Phone className="w-5 h-5 shrink-0 text-orange-500" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3 w-full">
                                <MapPin className="w-5 h-5 shrink-0 text-orange-500" />
                                <span>123 Logistics Way, TX 00000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[var(--color-text)] opacity-60 font-medium">
                    <p className="flex items-center gap-1"><Copyright className="w-4 h-4" /> {currentYear} N&Z Logistics LLC. All rights reserved.</p>
                    <p>Built with Next.js & Supabase</p>
                </div>
            </div>
        </footer>
    );
}
