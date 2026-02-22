import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApplicationById } from '@/actions/adminActions';
import StatusUpdater from '@/components/admin/StatusUpdater';
import ResumeDownloadButton from '@/components/admin/ResumeDownloadButton';
import SsnRow from '@/components/admin/SsnRow';
import { decrypt } from '@/lib/encryption';

function formatDate(iso: string) {
    return new Date(iso).toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function InfoRow({ label, value }: { label: string; value?: string | boolean | null }) {
    let displayValue = value;
    if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
    }

    return (
        <div className="flex gap-3">
            <dt className="w-56 shrink-0 text-xs text-[var(--color-muted)] uppercase tracking-wider pt-0.5">{label}</dt>
            <dd className="text-[var(--color-text)] text-sm">{displayValue !== undefined && displayValue !== null ? String(displayValue) : '—'}</dd>
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
            <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
                    <Link
                        href="/admin/applications"
                        className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors text-sm flex items-center gap-1.5"
                    >
                        ← Back to Applications
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-text)]">{fullName}</h1>
                        <p className="text-[var(--color-muted)] text-sm mt-1">Submitted {formatDate(application.created_at)}</p>
                    </div>
                    <StatusUpdater applicationId={application.id} currentStatus={application.status} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Personal Information */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                                Personal Information
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="First Name" value={application.first_name} />
                                <InfoRow label="Last Name" value={application.last_name} />
                                <InfoRow label="Date of Birth" value={decrypt(application.date_of_birth)} />
                                <InfoRow label="Other Names Used" value={application.other_name} />
                                <SsnRow ssn={decrypt(application.ssn)} />
                            </dl>
                        </div>

                        {/* Address */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                                Address
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="Street Address" value={application.street_address_1} />
                                <InfoRow label="City" value={application.city} />
                                <InfoRow label="State / Province" value={application.state} />
                                <InfoRow label="Zip / Postal Code" value={application.zip_code} />
                                <InfoRow label="Country" value={application.country} />
                                <InfoRow label="Lived There 3+ Years" value={application.lived_at_address_3plus_years} />
                            </dl>
                        </div>

                        {/* Contact */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                                Contact & General Information
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="Primary Phone" value={application.primary_phone} />
                                <InfoRow label="Email Address" value={application.email} />
                                <InfoRow label="Position Applied For" value={application.position} />
                                <InfoRow label="Location Applied For" value={application.location} />
                                <InfoRow label="Owner/Fleet Operator" value={application.is_owner_operator} />
                                <InfoRow label="Eligibile to work in US" value={application.eligible_us} />
                                <InfoRow label="Currently Employed" value={application.currently_employed} />
                                <InfoRow label="Speaks English" value={application.english_proficiency} />
                                <InfoRow label="Worked Before" value={application.worked_before} />
                                <InfoRow label="TWIC Card" value={application.twic_card} />
                                <InfoRow label="Military Service" value={application.military_service} />
                                <InfoRow label="Attended School (Past 10 Years)" value={application.attended_school} />
                                <InfoRow label="Employed/Contracted (Past 10 Years)" value={application.employed_last_10_years} />
                                <InfoRow label="How Did You Hear" value={application.how_did_you_hear} />
                                {application.referral_name && <InfoRow label="Referral Name" value={application.referral_name} />}
                                {application.other_hear && <InfoRow label="Other Method" value={application.other_hear} />}
                                <InfoRow label="FMCSA Registered" value={application.fmcsa_registered} />
                            </dl>
                        </div>

                        {/* Driving Experience & Employment History */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                                Driving Experience & Employment History
                            </h2>
                            <dl className="space-y-3">
                                <InfoRow label="Straight Truck" value={application.exp_straight_truck} />
                                <InfoRow label="Tractor and Semi-Trailer" value={application.exp_tractor_semi} />
                                <InfoRow label="Tractor - Two Trailers" value={application.exp_tractor_two_trailers} />
                                <div className="flex gap-3 mt-4 flex-col sm:flex-row">
                                    <dt className="w-56 shrink-0 text-xs text-[var(--color-muted)] uppercase tracking-wider pt-0.5">Other Experience</dt>
                                    <dd className="text-[var(--color-text)] text-sm whitespace-pre-wrap bg-[var(--color-surface)] p-3 rounded-lg flex-1 border border-[var(--color-border)]">{application.exp_other}</dd>
                                </div>
                            </dl>

                            {Array.isArray(application.employment_history) && application.employment_history.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="font-medium text-[var(--color-muted)] mb-3 text-sm uppercase tracking-wider">Employment History</h3>
                                    <div className="space-y-4">
                                        {application.employment_history.map((emp: any, i: number) => (
                                            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                                                <div className="font-medium text-[var(--color-text)]">{emp.employerName}</div>
                                                <div className="text-sm text-[var(--color-muted)] mt-1">{emp.positionTitle || 'No Title Provided'}</div>
                                                <div className="text-xs text-[var(--color-muted)] mt-2">
                                                    {emp.startDate} — {emp.endDate || 'Current'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* License Details */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                                License Details
                            </h2>
                            {Array.isArray(application.licenses) && application.licenses.length > 0 ? (
                                <div className="space-y-6">
                                    {application.licenses.map((lic: any, i: number) => (
                                        <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                                            <dl className="space-y-2">
                                                <InfoRow label="License Number" value={lic.licenseNumber} />
                                                <InfoRow label="State/Country" value={`${lic.state} / ${lic.country}`} />
                                                <InfoRow label="Expiration" value={lic.expirationDate} />
                                                <InfoRow label="Medical Card Exp" value={lic.dotMedicalCardExpiration} />
                                                <InfoRow label="Current?" value={lic.isCurrent === 'yes'} />
                                                <InfoRow label="Commercial?" value={lic.isCommercial === 'yes'} />
                                                <div className="flex gap-3 pt-2">
                                                    <dt className="w-56 shrink-0 text-xs text-[var(--color-muted)] uppercase tracking-wider">Endorsements</dt>
                                                    <dd className="text-[var(--color-text)] text-sm">
                                                        {Array.isArray(lic.endorsements) && lic.endorsements.length > 0 ? lic.endorsements.join(', ') : 'None'}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--color-muted)] text-sm">No licenses provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Resume */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-4">Resume</h2>
                            {application.resume_path ? (
                                <ResumeDownloadButton resumePath={application.resume_path} />
                            ) : (
                                <p className="text-[var(--color-muted)] text-sm italic">No resume uploaded.</p>
                            )}
                        </div>

                        {/* Application Meta */}
                        <div className="card">
                            <h2 className="font-semibold text-[var(--color-text)] mb-3">Application Info</h2>
                            <dl className="space-y-2 text-sm">
                                <div>
                                    <dt className="text-xs text-[var(--color-muted)] uppercase tracking-wider">ID</dt>
                                    <dd className="text-[var(--color-muted)] font-mono text-xs mt-0.5 truncate">{application.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Submitted</dt>
                                    <dd className="text-[var(--color-muted)] mt-0.5">{formatDate(application.created_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
