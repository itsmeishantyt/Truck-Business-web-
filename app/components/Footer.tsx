import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-700/60 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-3">
                            <span className="text-2xl">🚛</span>
                            <span className="text-white">Truck<span className="text-orange-400">Co</span></span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Delivering excellence across the nation. Join our growing team of professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/apply', label: 'Apply for a Job' },
                                { href: '/about', label: 'About Us' },
                                { href: '/faq', label: 'FAQ' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-orange-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Get in Touch</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <span>careers@truckco.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📍</span>
                                <span>123 Logistics Way, TX 00000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                    <p>© {currentYear} TruckCo. All rights reserved.</p>
                    <p>Built with Next.js & Supabase</p>
                </div>
            </div>
        </footer>
    );
}
