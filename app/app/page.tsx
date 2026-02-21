import Link from 'next/link';

const perks = [
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-market salaries and performance bonuses' },
  { icon: '🏥', title: 'Full Benefits', desc: 'Medical, dental & vision for you and your family' },
  { icon: '🛣️', title: 'Stable Routes', desc: 'Consistent, well-planned routes across the country' },
  { icon: '🎓', title: 'Training & Growth', desc: 'Paid CDL training programs and career development' },
  { icon: '🔧', title: 'Modern Fleet', desc: 'New trucks with the latest safety technology' },
  { icon: '🤝', title: 'Supportive Team', desc: 'A culture that values every member of the crew' },
];

const openPositions = [
  { title: 'OTR Truck Driver (Class A CDL)', type: 'Full-time', location: 'Nationwide' },
  { title: 'Local Delivery Driver', type: 'Full-time', location: 'Dallas, TX' },
  { title: 'Warehouse & Logistics Associate', type: 'Full-time', location: 'Houston, TX' },
  { title: 'Dispatch Coordinator', type: 'Full-time', location: 'Remote' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-24 pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6">
            🚛 Now Hiring — Multiple Positions Open
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Drive Your Career
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
              Forward With Us
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            TruckCo is one of the fastest-growing logistics companies in the nation.
            We&apos;re building a team of dedicated professionals — and we want you on board.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              Apply Now →
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-slate-700/60 bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '500+', label: 'Drivers Nationwide' },
            { num: '15+', label: 'Years in Business' },
            { num: '98%', label: 'On-Time Delivery' },
            { num: '4.8★', label: 'Employee Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-orange-400">{stat.num}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Join Us ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Why Join TruckCo?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            We take care of our people — so our people can focus on doing their best work.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="card hover:border-orange-500/40 transition-all duration-200 group"
            >
              <span className="text-3xl mb-4 block">{perk.icon}</span>
              <h3 className="font-bold text-white text-lg mb-1.5 group-hover:text-orange-400 transition-colors">{perk.title}</h3>
              <p className="text-slate-400 text-sm">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────────────── */}
      <section className="bg-slate-800/40 border-t border-slate-700/60">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-10">
            <h2 className="section-heading mb-3">Open Positions</h2>
            <p className="text-slate-400">Find a role that fits your skills and goals.</p>
          </div>
          <div className="space-y-4 mb-10">
            {openPositions.map((pos) => (
              <div
                key={pos.title}
                className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-500/40 transition-all duration-200"
              >
                <div>
                  <h3 className="font-semibold text-white">{pos.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="badge bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {pos.type}
                    </span>
                    <span className="text-slate-400 text-xs">{pos.location}</span>
                  </div>
                </div>
                <Link href="/apply" className="btn-primary text-sm px-5 py-2 shrink-0">
                  Apply →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/apply" className="btn-primary text-base px-10 py-3.5">
              Submit Your Application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
