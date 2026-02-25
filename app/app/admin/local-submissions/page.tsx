'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SqliteViewer() {
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/submit-application')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setApplications(data);
                else console.error('Invalid data format', data);
            })
            .catch(err => console.error('Error fetching SQLite data:', err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Submissions</h1>
                        <p className="text-[var(--color-muted)] text-sm">Forms submitted via the dynamic application flow (stored in SQLite).</p>
                    </div>
                    <Link href="/admin" className="btn-secondary text-sm px-4 py-2">
                        ← Back to Admin
                    </Link>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-2 border-[var(--color-border-strong)] border-t-[var(--color-text)] rounded-full animate-spin" />
                    </div>
                )}

                {/* Empty */}
                {!isLoading && applications.length === 0 && (
                    <div className="card text-center py-16 border-[var(--color-border-strong)]">
                        <p className="text-[var(--color-muted)] mb-2">No submissions found in the local SQLite database.</p>
                        <p className="text-sm text-[var(--color-muted)] opacity-60">Go fill out the /apply-form/ to see data here!</p>
                    </div>
                )}

                {/* Data grid */}
                {!isLoading && applications.length > 0 && (
                    <div className="grid gap-4">
                        {applications.map((app) => (
                            <div key={app.id} className="card hover:border-[var(--color-border-strong)] hover:shadow-[0_0_24px_rgba(255,255,255,0.04)] transition-all duration-300">
                                <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--color-border)]">
                                    <h3 className="font-bold text-lg text-[var(--color-text)]">Application #{app.id}</h3>
                                    <span className="text-xs text-[var(--color-muted)] bg-[var(--color-surface2)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                                        {new Date(app.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {Object.entries(app.data).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="text-xs text-[var(--color-muted)] uppercase font-bold tracking-widest mb-1">{key}</div>
                                            <div className="text-[var(--color-text)] font-medium whitespace-pre-wrap text-sm">{String(value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
