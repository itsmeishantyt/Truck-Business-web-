import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Lock, Sprout, Handshake, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us — N&Z Logistics LLC',
    description: 'Learn about N&Z Logistics LLC — our story, mission, values, and leadership team.',
};

const values = [
    { icon: <Target className="w-6 h-6" />, title: 'Reliability', desc: 'Every load, every time — on schedule and on budget.' },
    { icon: <Lock className="w-6 h-6" />, title: 'Integrity', desc: 'Honest communication with our drivers, clients, and partners.' },
    { icon: <Sprout className="w-6 h-6" />, title: 'Growth', desc: 'We invest in our people so they can grow with us long-term.' },
    { icon: <Handshake className="w-6 h-6" />, title: 'Community', desc: 'Supporting local communities wherever our routes take us.' },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">

            {/* Header */}
            <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />
                <span className="eyebrow mb-5">Our Story</span>
                <h1 className="section-heading text-4xl md:text-5xl mt-4 mb-5 text-[var(--color-text)]">
                    About <span className="gradient-text">N&Z Logistics LLC</span>
                </h1>
                <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
                    Founded over 15 years ago, N&Z Logistics LLC started with a single truck and a commitment to
                    on-time delivery. Today we operate a fleet of 500+ modern vehicles serving clients coast to coast.
                </p>
            </div>

            {/* Mission */}
            <div className="card mb-6 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] transition-all duration-300">
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Our Mission</h2>
                <p className="text-[var(--color-muted)] leading-relaxed">
                    To connect businesses with reliable transportation solutions while creating meaningful,
                    well-compensated careers for the people who keep America moving. We believe that
                    when our drivers thrive, our clients thrive — and that starts with investing in the right people.
                </p>
            </div>

            {/* Values */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {values.map((v) => (
                        <div key={v.title} className="card flex gap-4 items-start hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-2xl bg-[var(--color-surface3)] flex items-center justify-center text-[var(--color-text)] shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all">
                                {v.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">{v.title}</h3>
                                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leadership Team */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Leadership Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { name: 'John Placeholder', role: 'CEO & Founder' },
                        { name: 'Jane Placeholder', role: 'VP of Operations' },
                        { name: 'Mike Placeholder', role: 'Head of HR' },
                    ].map((person) => (
                        <div key={person.name} className="card text-center hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-[var(--color-surface3)] border border-[var(--color-border)] mx-auto mb-3 flex items-center justify-center text-[var(--color-muted)]">
                                <User className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-[var(--color-text)]">{person.name}</h3>
                            <p className="text-[var(--color-muted)] text-sm mt-1">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="card text-center relative overflow-hidden border-[var(--color-border-strong)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Ready to join the team?</h2>
                    <p className="text-[var(--color-muted)] mb-6">We&apos;re always looking for hard-working, dedicated people.</p>
                    <Link href="/apply-form/index.html" className="btn-primary inline-flex">
                        Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
