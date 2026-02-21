import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us — TruckCo',
    description: 'Learn about TruckCo — our story, mission, values, and leadership team.',
};

const values = [
    { icon: '🎯', title: 'Reliability', desc: 'Every load, every time — on schedule and on budget.' },
    { icon: '🔐', title: 'Integrity', desc: 'Honest communication with our drivers, clients, and partners.' },
    { icon: '🌱', title: 'Growth', desc: 'We invest in our people so they can grow with us long-term.' },
    { icon: '🤝', title: 'Community', desc: 'Supporting local communities wherever our routes take us.' },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-5">
                    Our Story
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                    About <span className="text-orange-400">TruckCo</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Founded over 15 years ago, TruckCo started with a single truck and a commitment to
                    on-time delivery. Today, we operate a fleet of 500+ modern vehicles serving clients
                    coast to coast.
                </p>
            </div>

            {/* Mission */}
            <div className="card mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                <p className="text-slate-400 leading-relaxed">
                    To connect businesses with reliable transportation solutions while creating meaningful,
                    well-compensated careers for the people who keep America moving. We believe that
                    when our drivers thrive, our clients thrive — and that starts with investing in the right people.
                </p>
            </div>

            {/* Values */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-white mb-6">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {values.map((v) => (
                        <div key={v.title} className="card flex gap-4 items-start">
                            <span className="text-3xl">{v.icon}</span>
                            <div>
                                <h3 className="font-semibold text-white mb-1">{v.title}</h3>
                                <p className="text-slate-400 text-sm">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Placeholder Team */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-white mb-6">Leadership Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                        { name: 'John Placeholder', role: 'CEO & Founder' },
                        { name: 'Jane Placeholder', role: 'VP of Operations' },
                        { name: 'Mike Placeholder', role: 'Head of HR' },
                    ].map((person) => (
                        <div key={person.name} className="card text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center text-2xl">
                                👤
                            </div>
                            <h3 className="font-semibold text-white">{person.name}</h3>
                            <p className="text-slate-400 text-sm mt-1">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="card text-center bg-gradient-to-br from-orange-900/20 to-slate-800 border-orange-500/20">
                <h2 className="text-2xl font-bold text-white mb-3">Ready to join the team?</h2>
                <p className="text-slate-400 mb-6">We&apos;re always looking for hard-working, dedicated people.</p>
                <Link href="/apply" className="btn-primary inline-flex">
                    Apply Now →
                </Link>
            </div>
        </div>
    );
}
