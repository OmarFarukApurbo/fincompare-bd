"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to manage product data</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                            placeholder="admin@fincompare.bd"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <p className="text-xs text-slate-500">
                        *If you don't have an account, create a user in your Supabase Dashboard under Authentication.
                    </p>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 flex justify-center items-center"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
