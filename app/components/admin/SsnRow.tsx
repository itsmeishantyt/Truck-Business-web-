'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SsnRow({ ssn }: { ssn: string }) {
    const [revealed, setRevealed] = useState(false);

    // Masked pattern for standard US SSN format
    const masked = ssn && ssn.length >= 4 ? `•••–••–${ssn.slice(-4)}` : '•••••••••';

    return (
        <div className="flex gap-3">
            <dt className="w-56 shrink-0 text-xs text-[var(--color-muted)] uppercase tracking-wider pt-0.5">SSN / SIN</dt>
            <dd className="text-[var(--color-text)] text-sm flex items-center gap-3">
                <span className="font-mono">{revealed ? ssn : masked}</span>
                <button
                    onClick={() => setRevealed(!revealed)}
                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                    title={revealed ? "Hide SSN" : "Reveal SSN"}
                >
                    {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </dd>
        </div>
    );
}
