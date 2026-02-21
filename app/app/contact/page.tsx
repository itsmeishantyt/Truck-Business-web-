import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us — TruckCo',
    description: 'Get in touch with the TruckCo recruitment team.',
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Contact <span className="text-orange-400">Us</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Have questions before applying? We&apos;re happy to help. Reach out to our recruiting team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div className="space-y-5">
                    {[
                        { icon: '📧', label: 'Email', value: 'careers@truckco.com', href: 'mailto:careers@truckco.com' },
                        { icon: '📞', label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                        { icon: '📍', label: 'Address', value: '123 Logistics Way\nDallas, TX 00000', href: undefined },
                        { icon: '🕐', label: 'Office Hours', value: 'Mon – Fri: 8am – 5pm CST', href: undefined },
                    ].map((item) => (
                        <div key={item.label} className="card flex items-start gap-4">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-white hover:text-orange-400 transition-colors font-medium">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-white font-medium whitespace-pre-line">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Card */}
                <div className="card bg-gradient-to-br from-orange-900/20 to-slate-800 border-orange-500/20 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-white mb-3">Applying for a position?</h2>
                    <p className="text-slate-400 mb-5 leading-relaxed">
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
                <p className="text-slate-400 text-sm mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-4">
                    {[
                        { label: 'LinkedIn', icon: '💼', href: '#' },
                        { label: 'Facebook', icon: '📘', href: '#' },
                        { label: 'Instagram', icon: '📸', href: '#' },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
                        >
                            <span>{s.icon}</span>{s.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
