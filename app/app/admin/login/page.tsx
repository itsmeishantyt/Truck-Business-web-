'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/actions/adminActions';
import { Truck } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await adminLogin(email, password);
        if (result.success) {
            router.push('/admin/applications');
        } else {
            setError(result.error ?? 'Login failed. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-10">
                    <span className="text-[var(--color-text)] mb-4 inline-block opacity-60"><Truck className="w-12 h-12" /></span>
                    <h1 className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
                        N&Z Logistics Admin
                    </h1>
                    <p className="text-[var(--color-muted)] text-sm mt-1">Careers Dashboard</p>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-6">Sign In</h2>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label" htmlFor="admin-email">Email</label>
                            <input
                                id="admin-email"
                                type="email"
                                className="input-field"
                                placeholder="admin@truckco.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="admin-password">Password</label>
                            <input
                                id="admin-password"
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-[var(--color-muted)] mt-5">
                    Protected area. Unauthorized access is strictly prohibited.
                </p>
            </div>
        </div>
    );
}
