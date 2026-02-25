'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, GripVertical, Save, LogIn } from 'lucide-react';

export default function AdminFormBuilder() {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [config, setConfig] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (isLoggedIn) {
            fetchConfig();
        }
    }, [isLoggedIn]);

    const fetchConfig = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/form-config');
            if (res.ok) {
                const data = await res.json();
                setConfig(data);
            }
        } catch (error) {
            console.error('Failed to fetch config', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // The API will validate this, but we use it as a basic gate
        if (password) {
            setIsLoggedIn(true);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setMessage({ text: '', type: '' });
        try {
            const res = await fetch('/api/form-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, config })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ text: 'Configuration saved successfully!', type: 'success' });
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } else {
                setMessage({ text: data.error || 'Failed to save', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Network error saving configuration', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const addQuestion = () => {
        setConfig([...config, {
            id: `q_${Date.now()}`,
            type: 'text',
            title: 'New Question',
            placeholder: '',
            required: true,
            errorMessage: 'Please answer this question.'
        }]);
    };

    const removeQuestion = (index: number) => {
        const newConfig = [...config];
        newConfig.splice(index, 1);
        setConfig(newConfig);
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newConfig = [...config];
        const temp = newConfig[index];
        newConfig[index] = newConfig[index - 1];
        newConfig[index - 1] = temp;
        setConfig(newConfig);
    };

    const moveDown = (index: number) => {
        if (index === config.length - 1) return;
        const newConfig = [...config];
        const temp = newConfig[index];
        newConfig[index] = newConfig[index + 1];
        newConfig[index + 1] = temp;
        setConfig(newConfig);
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const newConfig = [...config];
        newConfig[index] = { ...newConfig[index], [field]: value };
        setConfig(newConfig);
    };

    const updateOptions = (index: number, optionsString: string) => {
        const optionsArray = optionsString.split(',').map(o => o.trim()).filter(o => o);
        updateQuestion(index, 'options', optionsArray);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[var(--color-surface3)] rounded-full flex items-center justify-center">
                            <LogIn className="w-8 h-8 text-[var(--color-text)]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Panel</h1>
                    <p className="text-gray-400 text-center mb-8 text-sm">Enter password to configure the application flow.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-white/20 focus:border-[var(--color-border-strong)] outline-none transition-all"
                                placeholder="Admin password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg transition-colors shadow-lg shadow-white/10"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Application Form Builder</h1>
                        <p className="text-gray-400">Configure questions, types, and validation rules for the Typeform-like flow.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {message.text && (
                            <span className={`text-sm px-3 py-1 rounded-md ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {message.text}
                            </span>
                        )}
                        <Link
                            href="/admin/local-submissions"
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                        >
                            View Submissions
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-white/10 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isLoading ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {config.map((q, index) => (
                        <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm transition-all hover:border-gray-600">
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col gap-1 mt-1">
                                    <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
                                    </button>
                                    <button onClick={() => moveDown(index)} disabled={index === config.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-8 flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Question Title</label>
                                            <input
                                                type="text"
                                                value={q.title || ''}
                                                onChange={(e) => updateQuestion(index, 'title', e.target.value)}
                                                className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Internal ID</label>
                                                <input
                                                    type="text"
                                                    value={q.id || ''}
                                                    onChange={(e) => updateQuestion(index, 'id', e.target.value)}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white outline-none"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Placeholder</label>
                                                <input
                                                    type="text"
                                                    value={q.placeholder || ''}
                                                    onChange={(e) => updateQuestion(index, 'placeholder', e.target.value)}
                                                    className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                                    disabled={q.type === 'options'}
                                                />
                                            </div>
                                        </div>
                                        {q.type === 'options' && (
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Options (comma separated)</label>
                                                <input
                                                    type="text"
                                                    value={(q.options || []).join(', ')}
                                                    onChange={(e) => updateOptions(index, e.target.value)}
                                                    className="w-full bg-[var(--color-surface2)] border border-[var(--color-border-strong)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                                    placeholder="Option 1, Option 2, Option 3"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Error Message</label>
                                            <input
                                                type="text"
                                                value={q.errorMessage || ''}
                                                onChange={(e) => updateQuestion(index, 'errorMessage', e.target.value)}
                                                className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-4 flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Input Type</label>
                                            <select
                                                value={q.type || 'text'}
                                                onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                                                className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                            >
                                                <option value="text">Short Text</option>
                                                <option value="email">Email</option>
                                                <option value="tel">Phone Number</option>
                                                <option value="number">Number</option>
                                                <option value="options">Multiple Choice</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Layout Mode</label>
                                            <select
                                                value={q.display_mode || 'single'}
                                                onChange={(e) => updateQuestion(index, 'display_mode', e.target.value)}
                                                className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text)] focus:ring-1 focus:ring-white/20 outline-none"
                                            >
                                                <option value="single">Single (Typeform — one at a time)</option>
                                                <option value="page">Page (Google Form — grouped)</option>
                                            </select>
                                            <p className="text-xs text-[var(--color-muted)] mt-0.5">Consecutive &apos;Page&apos; questions are grouped on one scrollable card page.</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <input
                                                type="checkbox"
                                                id={`req-${index}`}
                                                checked={q.required || false}
                                                onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
                                                className="w-4 h-4"
                                            />
                                            <label htmlFor={`req-${index}`} className="text-sm text-gray-300">Required field</label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeQuestion(index)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors mt-6 md:mt-0"
                                    title="Delete Question"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {config.length === 0 && !isLoading && (
                        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700 border-dashed">
                            <p className="text-gray-400 mb-4">No questions configured yet.</p>
                            <button onClick={addQuestion} className="text-[var(--color-muted)] hover:text-[var(--color-text)] font-medium">
                                + Add First Question
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={addQuestion}
                        className="flex items-center gap-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-xl transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Question
                    </button>
                </div>
            </div>
        </div>
    );
}
