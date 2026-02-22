"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ReturnCalculator from "@/components/ReturnCalculator";
import DPSFDRComparisonTable from "@/components/DPSFDRComparisonTable";
import { useI18n } from '@/context/I18nContext';

export default function DepositsPage() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white">
            <Navbar />

            <PageHeader
                title={t.navbar.dps_fdr}
                description={t.pages.deposits.desc}
                breadcrumbs={[
                    { label: t.navbar.dps_fdr }
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Tools */}
                    <aside className="w-full lg:w-1/3 space-y-8">
                        <div className="sticky top-24">
                            <ReturnCalculator />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-2/3">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                            <div className="mb-6 flex justify-end items-center pb-4 border-b border-slate-100">
                                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-blue focus:border-brand-blue block p-2.5 outline-none font-medium">
                                    <option>Sort by: Popularity</option>
                                    <option>Sort by: Highest Rate</option>
                                    <option>Sort by: Minimum Deposit</option>
                                </select>
                            </div>

                            <div className="mt-8">
                                <DPSFDRComparisonTable hideViewAll transparentBg condensed />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
