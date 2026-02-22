"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ProductFilterSidebar from "@/components/filters/ProductFilterSidebar";
import ProductComparisonTable from "@/components/ProductComparisonTable";
import { useI18n } from '@/context/I18nContext';

export default function CardsPage() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white">
            <Navbar />

            <PageHeader
                title={t.navbar.credit_cards}
                description={t.pages.cards.desc}
                breadcrumbs={[
                    { label: t.navbar.credit_cards }
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4">
                        <ProductFilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                            <div className="mb-6 flex justify-end items-center pb-4 border-b border-slate-100">
                                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-blue focus:border-brand-blue block p-2.5 outline-none font-medium">
                                    <option>{t.pages.cards.sort_pop}</option>
                                    <option>{t.pages.cards.sort_fee}</option>
                                    <option>{t.pages.cards.sort_rating}</option>
                                </select>
                            </div>

                            {/* We reuse the ProductComparisonTable's cards view here for the MVP visually */}
                            {/* In a real app we would pass filtered data as props. */}
                            <div className="mt-8">
                                <ProductComparisonTable hideViewAll transparentBg condensed />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
