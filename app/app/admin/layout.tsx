import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin — TruckCo',
};

// Admin section has its own minimal layout (no public Navbar/Footer)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-900">
            {children}
        </div>
    );
}
