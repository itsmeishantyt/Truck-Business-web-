import Link from 'next/link';
import { CircleDollarSign, HeartPulse, Route, GraduationCap, Wrench, Users, Truck, ArrowRight, Shield, Zap } from 'lucide-react';

const perks = [
  { icon: <CircleDollarSign className="w-6 h-6" />, title: 'Competitive Pay', desc: 'Top-market salaries and performance bonuses that reward your expertise.' },
  { icon: <HeartPulse className="w-6 h-6" />, title: 'Full Benefits', desc: 'Medical, dental & vision coverage for you and your entire family.' },
  { icon: <Route className="w-6 h-6" />, title: 'Stable Routes', desc: 'Consistent, well-planned routes across the country — no surprises.' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Training & Growth', desc: 'Paid CDL training programs and career development pathways.' },
  { icon: <Wrench className="w-6 h-6" />, title: 'Modern Fleet', desc: 'New trucks equipped with the latest safety and comfort technology.' },
  { icon: <Users className="w-6 h-6" />, title: 'Supportive Team', desc: 'A culture that genuinely values every member of the crew.' },
];

const openPositions = [
  { title: 'OTR Truck Driver (CDL Class A)', type: 'Full-time', location: 'Nationwide' },
  { title: 'Amazon Driver Solo', type: 'Full-time', location: 'Dallas, TX' },
  { title: 'Local Delivery Driver', type: 'Full-time', location: 'Dallas, TX' },
];

const stats = [
  { num: '500+', label: 'Drivers Nationwide' },
  { num: '15+', label: 'Years in Business' },
  { num: '98%', label: 'On-Time Delivery' },
  { num: '4.8★', label: 'Employee Rating' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 md:pt-28 md:pb-44 flex justify-center items-center min-h-[90vh]">

        {/* Background glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central white glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/5 blur-[100px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-white/[0.04] blur-[80px]" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_65%)]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">

          {/* Logo with glow */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 blur-3xl bg-white/10 rounded-full scale-150" />
            <img
              src="/logo.svg"
              alt="N&Z Logistics LLC"
              className="relative h-20 md:h-28 w-auto mx-auto dark:invert dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Eyebrow */}
          <span className="eyebrow mb-6">
            <Truck className="w-3.5 h-3.5" />
            Now Hiring — Multiple Positions Open
          </span>

          {/* Headline */}
          <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl text-[var(--color-text)]">
            Drive Your Career{' '}
            <span className="gradient-text">Forward With Us</span>
          </h1>

          {/* Sub */}
          <p className="text-[var(--color-muted)] text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            N&Z Logistics LLC is one of the fastest-growing logistics companies in the nation.
            We&apos;re building a team of dedicated professionals — and we want you on board.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply-form/index.html" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              Learn About Us
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-2.5 text-[var(--color-muted)] text-sm">
            <div className="flex -space-x-2">
              {['bg-neutral-400', 'bg-neutral-600', 'bg-neutral-500', 'bg-neutral-700'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-[var(--color-bg)] flex items-center justify-center text-white text-xs font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>Trusted by <strong className="text-[var(--color-text)]">500+ drivers</strong> nationwide</span>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="group">
              <p className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 inline-block">
                {s.num}
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────── */}
      <section className="px-4 py-20 md:py-28 max-w-4xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_75%)]" />
          <p className="section-heading text-2xl md:text-3xl lg:text-4xl text-[var(--color-text)] font-bold leading-snug mb-6 relative z-10">
            &ldquo;We are a family-owned trucking business with decades of experience. We ensure every delivery is on time, driven by trusted professionals.&rdquo;
          </p>
          <p className="text-[var(--color-muted)] text-sm font-bold tracking-widest uppercase relative z-10">— N&Z Logistics Leadership</p>
        </div>
      </section>

      {/* ── Why Join Us ───────────────────────────────────── */}
      <section className="px-4 py-20 md:py-28 bg-[var(--color-surface)]/40 border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow mb-4">Benefits</span>
            <h2 className="section-heading mt-4 mb-4 text-[var(--color-text)]">Why Join N&Z Logistics?</h2>
            <p className="text-[var(--color-muted)] max-w-xl mx-auto text-base">
              We take care of our people — so our people can focus on doing their best work.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="card group cursor-default hover:border-[var(--color-border-strong)] hover:shadow-[0_0_40px_rgba(255,255,255,0.04)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface3)] flex items-center justify-center text-[var(--color-text)] mb-5 group-hover:bg-[var(--color-surface2)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300">
                  {perk.icon}
                </div>
                <h3 className="font-bold text-[var(--color-text)] text-lg mb-2">{perk.title}</h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ────────────────────────────────── */}
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow mb-4">Careers</span>
            <h2 className="section-heading mt-4 mb-4 text-[var(--color-text)]">Open Positions</h2>
            <p className="text-[var(--color-muted)] text-base">Find a role that fits your skills and ambitions.</p>
          </div>

          <div className="space-y-3 mb-12">
            {openPositions.map((pos) => (
              <Link
                key={pos.title}
                href="/apply-form/index.html"
                className="card group flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5 transition-all duration-300 no-underline"
              >
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] text-base">{pos.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="badge bg-[var(--color-surface3)] text-[var(--color-muted)] border border-[var(--color-border-strong)] text-xs font-semibold">{pos.type}</span>
                    <span className="text-[var(--color-muted)] text-xs">📍 {pos.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-muted)] text-sm font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/apply-form/index.html" className="btn-primary text-base px-10 py-4">
              Submit Your Application
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
