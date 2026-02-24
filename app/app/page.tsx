import Link from 'next/link';
import Image from 'next/image';
import { CircleDollarSign, HeartPulse, Route, GraduationCap, Wrench, Users, Truck } from 'lucide-react';

const perks = [
  { icon: <CircleDollarSign className="w-8 h-8 text-orange-400" />, title: 'Competitive Pay', desc: 'Top-market salaries and performance bonuses' },
  { icon: <HeartPulse className="w-8 h-8 text-orange-400" />, title: 'Full Benefits', desc: 'Medical, dental & vision for you and your family' },
  { icon: <Route className="w-8 h-8 text-orange-400" />, title: 'Stable Routes', desc: 'Consistent, well-planned routes across the country' },
  { icon: <GraduationCap className="w-8 h-8 text-orange-400" />, title: 'Training & Growth', desc: 'Paid CDL training programs and career development' },
  { icon: <Wrench className="w-8 h-8 text-orange-400" />, title: 'Modern Fleet', desc: 'New trucks with the latest safety technology' },
  { icon: <Users className="w-8 h-8 text-orange-400" />, title: 'Supportive Team', desc: 'A culture that values every member of the crew' },
];

const openPositions = [
  { title: 'OTR Truck Driver (CDL Class A)', type: 'Full-time', location: 'Nationwide' },
  { title: 'Amazon Driver Solo', type: 'Full-time', location: 'Dallas, TX' },
  { title: 'Local Delivery Driver', type: 'Full-time', location: 'Dallas, TX' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-16 md:py-24 lg:py-32 flex justify-center items-center min-h-[85vh]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400/5 via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          <img src="/logo.webp" alt="N&Z Logistics LLC" className="h-24 md:h-32 w-auto mb-10 dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] drop-shadow-xl transition-transform hover:scale-[1.02]" />

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6 shadow-sm">
            <Truck className="w-4 h-4" /> Now Hiring — Multiple Positions Open
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Drive Your Career
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Forward With Us
            </span>
          </h1>
          <p className="text-[var(--color-muted)] text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            N&Z Logistics LLC is one of the fastest-growing logistics companies in the nation.
            We&apos;re building a team of dedicated professionals — and we want you on board.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply-form/index.html" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              Apply Now →
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Introduction ─────────────────────────────────────── */}
      <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <p className="text-[var(--color-muted)] text-lg md:text-xl lg:text-2xl leading-relaxed font-medium">
          We are a family-owned trucking business with decades of experience. We know your fleet’s needs and ensure every delivery is on time, driven by a team of trusted, experienced professionals.
        </p>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/30">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {[
            { num: '500+', label: 'Drivers Nationwide' },
            { num: '15+', label: 'Years in Business' },
            { num: '98%', label: 'On-Time Delivery' },
            { num: '4.8★', label: 'Employee Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-orange-400">{stat.num}</p>
              <p className="text-[var(--color-muted)] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Join Us ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-heading mb-3">Why Join N&Z Logistics LLC?</h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            We take care of our people — so our people can focus on doing their best work.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="card bg-[var(--color-surface2)]/50 hover:bg-[var(--color-surface)] hover:border-orange-500/40 hover:shadow-xl transition-all duration-300 group"
            >
              <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{perk.icon}</span>
              <h3 className="font-bold text-[var(--color-text)] text-lg mb-1.5 group-hover:text-orange-400 transition-colors">{perk.title}</h3>
              <p className="text-[var(--color-muted)] text-sm">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)]/40 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="section-heading mb-3">Open Positions</h2>
            <p className="text-[var(--color-muted)]">Find a role that fits your skills and goals.</p>
          </div>
          <div className="space-y-4 mb-10">
            {openPositions.map((pos) => (
              <div
                key={pos.title}
                className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-500/40 transition-all duration-200"
              >
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">{pos.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="badge bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {pos.type}
                    </span>
                    <span className="text-[var(--color-muted)] text-xs">{pos.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/apply-form/index.html" className="btn-primary text-base px-10 py-3.5">
              Submit Your Application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
