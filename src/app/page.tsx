"use client";

import Navbar from "@/components/Navbar";
import HeroSearchWidget from "@/components/HeroSearchWidget";
import QuickActions from "@/components/QuickActions";
import FinancialLiteracy from "@/components/FinancialLiteracy";
import ProductComparisonTable from "@/components/ProductComparisonTable";
import { useI18n } from '@/context/I18nContext';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-20 md:pb-0">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-brand-dark pt-16 pb-32">
        {/* Animated Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
          <div className="absolute top-0 right-0 md:-top-20 md:-right-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-brand-blue mix-blend-screen blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-20 -left-20 md:top-40 md:-left-40 w-64 h-64 md:w-80 md:h-80 rounded-full bg-brand-green mix-blend-screen blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-emerald-500/40 mix-blend-screen blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 animate-in slide-in-from-bottom-8 duration-700">
              {t.hero.title_part1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">{t.hero.title_highlight}</span> {t.hero.title_part2}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">
              {t.hero.subtitle.split('. ')[0]}. <br className="hidden md:block" />{t.hero.subtitle.split('. ')[1]}
            </p>
          </div>

          <div className="flex justify-center">
            <HeroSearchWidget />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <QuickActions />

      <ProductComparisonTable />

      <FinancialLiteracy />
    </div>
  );
}
