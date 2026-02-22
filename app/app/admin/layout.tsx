import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin — N&Z Logistics LLC',
};

// Admin section has its own minimal layout (no public Navbar/Footer)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {children}
        </div>
    );
}
