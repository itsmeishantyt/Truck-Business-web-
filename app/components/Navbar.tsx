'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
            className="p-2 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] transition-all focus:outline-none"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? 'border-b border-[var(--color-border)] backdrop-blur-2xl bg-[var(--color-bg)]/80 shadow-[0_1px_40px_rgba(255,255,255,0.03)]'
            : 'border-b border-transparent bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center hover:opacity-90 transition-opacity group">
                        <img
                            src="/logo.svg"
                            alt="N&Z Logistics LLC"
                            className="h-9 md:h-11 w-auto transition-all duration-300 group-hover:scale-105 dark:invert group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                        />
                    </Link>

                    {/* Desktop Nav — pill style */}
                    <nav className="hidden md:flex items-center gap-1 bg-[var(--color-surface)]/70 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl px-2 py-1.5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname === link.href
                                    ? 'text-[var(--color-text)] bg-[var(--color-surface2)] shadow-[0_0_12px_rgba(255,255,255,0.06)]'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/apply-form/index.html" className="btn-primary text-sm px-5 py-2.5">
                            Apply Now →
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-5 pt-2 border-t border-[var(--color-border)] mt-1 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex px-4 py-3 rounded-xl text-base font-medium transition-colors ${pathname === link.href
                                    ? 'text-[var(--color-text)] bg-[var(--color-surface2)]'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/apply-form/index.html"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary text-sm px-5 py-3 mt-2 w-full"
                        >
                            Apply Now →
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
