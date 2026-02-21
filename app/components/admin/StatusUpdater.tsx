'use client';

import { useState } from 'react';
import { updateApplicationStatus } from '@/actions/adminActions';

const statuses = ['pending', 'reviewing', 'accepted', 'rejected'] as const;
type Status = typeof statuses[number];

const statusColors: Record<Status, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    reviewing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    accepted: 'bg-green-500/10 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function StatusUpdater({
    applicationId,
    currentStatus,
}: {
    applicationId: string;
    currentStatus: Status;
}) {
    const [status, setStatus] = useState<Status>(currentStatus);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async (newStatus: Status) => {
        if (newStatus === status) return;
        setLoading(true);
        setMessage('');
        try {
            await updateApplicationStatus(applicationId, newStatus);
            setStatus(newStatus);
            setMessage('Status updated successfully.');
        } catch {
            setMessage('Failed to update status. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <p className="label mb-2">Application Status</p>
            <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                    <button
                        key={s}
                        onClick={() => handleUpdate(s)}
                        disabled={loading}
                        className={`badge border px-3 py-1.5 text-xs capitalize cursor-pointer transition-all disabled:opacity-60 ${status === s
                                ? statusColors[s] + ' ring-1 ring-current scale-105'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:border-slate-400'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
            {message && (
                <p className={`text-xs mt-2 ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
