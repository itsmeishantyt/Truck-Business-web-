import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApplicationById } from '@/actions/adminActions';
import StatusUpdater from '@/components/admin/StatusUpdater';
import ResumeDownloadButton from '@/components/admin/ResumeDownloadButton';

function formatDate(iso: string) {
    return new Date(iso).toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="flex gap-3">
            <dt className="w-48 shrink-0 text-xs text-slate-500 uppercase tracking-wider pt-0.5">{label}</dt>
            <dd className="text-white text-sm">{value || '—'}</dd>
        </div>
    );
}

export default async function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let application: Awaited<ReturnType<typeof getApplicationById>>;
    try {
        application = await getApplicationById(id);
    } catch {
        notFound();
    }

    const fullName = `${application.first_name} ${application.last_name}`;

    return (
        <div className="min-h-screen">
            {/* Top bar */}
            <header className="border-b border-slate-700/60 bg-slate-800/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
                    <Link
                        href="/admin/applications"
                        className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5"
                    >
                        ← Back to Applications
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{fullName}</h1>
                        <p className="text-slate-400 text-sm mt-1">Submitted {formatDate(application.created_at)}</p>
                    </div>
                    <StatusUpdater applicationId={application.id} currentStatus={application.status} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Personal Information */}
                        <div className="card">
                            <h2 className="font-semibold text-white mb-4 pb-3 border-b border-slate-700/60">
                                Personal Information
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="First Name" value={application.first_name} />
                                <InfoRow label="Last Name" value={application.last_name} />
                                <InfoRow label="Date of Birth" value={application.date_of_birth} />
                                <InfoRow label="SSN / SIN" value={application.ssn ? '•••–••–' + application.ssn.slice(-4) : undefined} />
                            </dl>
                        </div>

                        {/* Address */}
                        <div className="card">
                            <h2 className="font-semibold text-white mb-4 pb-3 border-b border-slate-700/60">
                                Address
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="Street Address" value={application.street_address_1} />
                                <InfoRow label="City" value={application.city} />
                                <InfoRow label="State / Province" value={application.state} />
                                <InfoRow label="Zip / Postal Code" value={application.zip_code} />
                                <InfoRow label="Country" value={application.country} />
                                <InfoRow
                                    label="Lived There 3+ Years"
                                    value={application.lived_at_address_3plus_years === true ? 'Yes' : application.lived_at_address_3plus_years === false ? 'No' : undefined}
                                />
                            </dl>
                        </div>

                        {/* Contact */}
                        <div className="card">
                            <h2 className="font-semibold text-white mb-4 pb-3 border-b border-slate-700/60">
                                Contact
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="Primary Phone" value={application.primary_phone} />
                                <InfoRow label="Email Address" value={application.email} />
                                <InfoRow label="Position Applied For" value={application.position} />
                            </dl>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Resume */}
                        <div className="card">
                            <h2 className="font-semibold text-white mb-4">Resume</h2>
                            {application.resume_path ? (
                                <ResumeDownloadButton resumePath={application.resume_path} />
                            ) : (
                                <p className="text-slate-500 text-sm italic">No resume uploaded.</p>
                            )}
                        </div>

                        {/* Application Meta */}
                        <div className="card">
                            <h2 className="font-semibold text-white mb-3">Application Info</h2>
                            <dl className="space-y-2 text-sm">
                                <div>
                                    <dt className="text-xs text-slate-500 uppercase tracking-wider">ID</dt>
                                    <dd className="text-slate-400 font-mono text-xs mt-0.5 truncate">{application.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-slate-500 uppercase tracking-wider">Submitted</dt>
                                    <dd className="text-slate-400 mt-0.5">{formatDate(application.created_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
