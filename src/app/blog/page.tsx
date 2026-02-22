"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useI18n } from '@/context/I18nContext';

export default function BlogPage() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white">
            <Navbar />

            <PageHeader
                title={t.pages.blog.title}
                description={t.pages.blog.desc}
                breadcrumbs={[{ label: t.pages.blog.title }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                <main className="w-full">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center py-24">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t.pages.blog.coming_soon}</h2>
                        <p className="text-slate-500">{t.pages.blog.curating}</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
