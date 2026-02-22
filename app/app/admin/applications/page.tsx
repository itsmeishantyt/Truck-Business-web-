import Link from 'next/link';
import { getApplications } from '@/actions/adminActions';
import { adminLogout } from '@/actions/adminActions';
import { Truck, AlertTriangle, Inbox } from 'lucide-react';

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
            <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="shrink-0 text-orange-400"><Truck className="w-8 h-8" /></span>
                        <div>
                            <h1 className="font-bold text-[var(--color-text)] text-lg leading-none">N&Z Logistics Admin</h1>
                            <p className="text-[var(--color-muted)] text-xs">Careers Dashboard</p>
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
                    <h2 className="text-2xl font-bold text-[var(--color-text)]">Applications</h2>
                    <p className="text-[var(--color-muted)] text-sm">
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
                                : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-slate-500'
                                }`}
                        >
                            {f}
                        </Link>
                    ))}
                </div>

                {/* Error state */}
                {fetchError && (
                    <div className="card text-center py-10 flex flex-col items-center justify-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <p className="text-red-400">{fetchError}</p>
                    </div>
                )}

                {/* Empty state */}
                {!fetchError && applications.length === 0 && (
                    <div className="card text-center py-16 flex flex-col items-center justify-center">
                        <span className="mb-3 block text-[var(--color-muted)]"><Inbox className="w-12 h-12" /></span>
                        <p className="text-[var(--color-text)] font-semibold">No applications yet</p>
                        <p className="text-[var(--color-muted)] text-sm mt-1">
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
                                <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                                    <tr className="text-left text-xs text-[var(--color-muted)] uppercase tracking-wider">
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
                                        <tr key={app.id} className="hover:bg-[var(--color-surface)]/40 transition-colors">
                                            <td className="px-5 py-4 font-medium text-[var(--color-text)]">{app.first_name} {app.last_name}</td>
                                            <td className="px-5 py-4 text-[var(--color-muted)] hidden sm:table-cell">{app.email}</td>
                                            <td className="px-5 py-4 text-[var(--color-muted)] hidden md:table-cell max-w-xs truncate">{app.position}</td>
                                            <td className="px-5 py-4">
                                                <span className={`badge border ${statusColors[app.status] ?? 'bg-[var(--color-surface2)]'} capitalize`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-[var(--color-muted)] hidden lg:table-cell">
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
