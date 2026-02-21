'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/actions/adminActions';

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
                <div className="text-center mb-8">
                    <span className="text-4xl block mb-2">🚛</span>
                    <h1 className="text-2xl font-bold text-white">
                        Truck<span className="text-orange-400">Co</span> Admin
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Careers Dashboard</p>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-white mb-6">Sign In</h2>

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

                <p className="text-center text-xs text-slate-600 mt-5">
                    This area is restricted to authorized personnel only.
                </p>
            </div>
        </div>
    );
}
