'use client';

import { useState } from 'react';

export default function ResumeDownloadButton({ resumePath }: { resumePath: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDownload = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/admin/resume?path=${encodeURIComponent(resumePath)}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Failed to get download link');
            // Open signed URL in a new tab
            window.open(data.url, '_blank');
        } catch (e) {
            setError((e as Error).message);
        }
        setLoading(false);
    };

    return (
        <div>
            <button
                onClick={handleDownload}
                disabled={loading}
                className="btn-primary text-sm px-5 py-2.5 disabled:opacity-60"
            >
                {loading ? 'Generating link…' : '📄 Download Resume (PDF)'}
            </button>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
    );
}
