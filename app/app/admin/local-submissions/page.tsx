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
                if (Array.isArray(data)) {
                    setApplications(data);
                } else {
                    console.error('Invalid data format', data);
                }
            })
            .catch(err => console.error('Error fetching SQLite data:', err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Local Typeform Submissions (SQLite)</h1>
                        <p className="text-gray-400">These are the forms submitted via the new dynamic application flow.</p>
                    </div>
                    <Link href="/admin/applications" className="btn-secondary px-4 py-2">
                        Back to main admin
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-10 text-center">
                        <p className="text-gray-400">No submissions found in the local SQLite database.</p>
                        <p className="text-sm text-gray-500 mt-2">Go fill out the /apply-form/ to see data here!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                                <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
                                    <h3 className="font-bold text-xl text-orange-400">Application #{app.id}</h3>
                                    <span className="text-sm text-gray-500 bg-gray-900 px-3 py-1 rounded-full">
                                        {new Date(app.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(app.data).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{key}</div>
                                            <div className="text-gray-200 font-medium whitespace-pre-wrap">{String(value)}</div>
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
