"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import EMICalculator from "@/components/EMICalculator";
import LoanComparisonTable from "@/components/LoanComparisonTable";
import { useI18n } from '@/context/I18nContext';

export default function LoansPage() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-20 md:pb-0">
            <Navbar />

            <PageHeader
                title={t.navbar.loans}
                description={t.pages.loans.desc}
                breadcrumbs={[
                    { label: t.navbar.loans }
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Tools */}
                    <aside className="w-full lg:w-1/3 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <EMICalculator />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-2/3">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                            <div className="-mx-2">
                                <LoanComparisonTable />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
