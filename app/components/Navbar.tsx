'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] transition-all flex items-center justify-center outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-[var(--color-text)]" />}
        </button>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-md bg-[var(--color-bg)]/80 transition-all duration-300 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo (Left) */}
                    <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                        <img src="/logo.webp" alt="N&Z Logistics LLC" className="h-10 md:h-12 w-auto dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] drop-shadow-md transition-transform hover:scale-105" />
                    </Link>

                    {/* Desktop nav (Center) */}
                    <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-5 py-3 rounded-lg text-base font-semibold transition-colors duration-150 ${pathname === link.href
                                    ? 'text-orange-400 bg-[var(--color-surface2)]'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA (Right) */}
                    <div className="hidden md:flex items-center justify-end gap-6 flex-1">
                        <ThemeToggle />
                        <Link href="/apply-form/index.html" className="btn-primary text-base px-6 py-2.5 shadow-md hover:shadow-lg">
                            Apply Now
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 pt-2 border-t border-[var(--color-border)] mt-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex px-4 py-3 rounded-lg text-base font-medium transition-colors my-1 ${pathname === link.href
                                    ? 'text-orange-400 bg-orange-500/10'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/apply-form/index.html"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary text-base px-5 py-3 mt-3 w-full"
                        >
                            Apply Now
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
