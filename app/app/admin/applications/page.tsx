import Link from 'next/link';
import { getApplications } from '@/actions/adminActions';
import { adminLogout } from '@/actions/adminActions';

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    reviewing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accepted: 'bg-green-500/10 text-green-400 border-green-500/20',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default async function AdminApplicationsPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const { status } = await searchParams;
    const activeFilter = status ?? 'all';

    let applications: Awaited<ReturnType<typeof getApplications>> = [];
    let fetchError = '';

    try {
        applications = await getApplications(activeFilter);
    } catch (e) {
        fetchError = (e as Error).message;
    }

    const filters = ['all', 'pending', 'reviewing', 'accepted', 'rejected'];

    return (
        <div className="min-h-screen">
            {/* Top bar */}
            <header className="border-b border-slate-700/60 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🚛</span>
                        <div>
                            <h1 className="font-bold text-white text-lg leading-none">TruckCo Admin</h1>
                            <p className="text-slate-500 text-xs">Careers Dashboard</p>
                        </div>
                    </div>
                    <form action={adminLogout}>
                        <button type="submit" className="btn-secondary text-sm px-4 py-2">
                            Sign Out
                        </button>
                    </form>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Page title + stats */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-white">Applications</h2>
                    <p className="text-slate-400 text-sm">
                        {applications.length} result{applications.length !== 1 ? 's' : ''}
                        {activeFilter !== 'all' && ` — filtered by "${activeFilter}"`}
                    </p>
                </div>

                {/* Status filter tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.map((f) => (
                        <Link
                            key={f}
                            href={f === 'all' ? '/admin/applications' : `?status=${f}`}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors capitalize ${activeFilter === f
                                ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                                : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                                }`}
                        >
                            {f}
                        </Link>
                    ))}
                </div>

                {/* Error state */}
                {fetchError && (
                    <div className="card text-center py-10">
                        <p className="text-red-400">⚠️ {fetchError}</p>
                    </div>
                )}

                {/* Empty state */}
                {!fetchError && applications.length === 0 && (
                    <div className="card text-center py-16">
                        <span className="text-4xl mb-3 block">📭</span>
                        <p className="text-white font-semibold">No applications yet</p>
                        <p className="text-slate-400 text-sm mt-1">
                            {activeFilter !== 'all'
                                ? `No applications with status "${activeFilter}".`
                                : 'Applications will appear here once candidates apply.'}
                        </p>
                    </div>
                )}

                {/* Applications table */}
                {applications.length > 0 && (
                    <div className="card overflow-hidden p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-slate-700/60 bg-slate-800/50">
                                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                                        <th className="px-5 py-3.5 font-semibold">Name</th>
                                        <th className="px-5 py-3.5 font-semibold hidden sm:table-cell">Email</th>
                                        <th className="px-5 py-3.5 font-semibold hidden md:table-cell">Position</th>
                                        <th className="px-5 py-3.5 font-semibold">Status</th>
                                        <th className="px-5 py-3.5 font-semibold hidden lg:table-cell">Date</th>
                                        <th className="px-5 py-3.5 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/40">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="px-5 py-4 font-medium text-white">{app.first_name} {app.last_name}</td>
                                            <td className="px-5 py-4 text-slate-400 hidden sm:table-cell">{app.email}</td>
                                            <td className="px-5 py-4 text-slate-400 hidden md:table-cell max-w-xs truncate">{app.position}</td>
                                            <td className="px-5 py-4">
                                                <span className={`badge border ${statusColors[app.status] ?? 'bg-slate-700 text-slate-300'} capitalize`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-slate-400 hidden lg:table-cell">
                                                {formatDate(app.created_at)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={`/admin/applications/${app.id}`}
                                                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                                                >
                                                    View →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
