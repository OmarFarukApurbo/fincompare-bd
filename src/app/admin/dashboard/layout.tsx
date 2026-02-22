"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin/login');
            } else {
                setIsLoading(false);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.push('/admin/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Simple Admin Nav */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl text-brand-dark">FinCompare BD Admin</span>
                        </div>
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                router.push('/admin/login');
                            }}
                            className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
