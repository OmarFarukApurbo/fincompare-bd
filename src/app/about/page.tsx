"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Target, Shield, Zap, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useI18n } from '@/context/I18nContext';

export default function AboutPage() {
    const { t } = useI18n();

    return (
        <div className="font-sans selection:bg-brand-blue selection:text-white pb-20">
            <Navbar />

            <PageHeader
                title={t.pages.about.title}
                description={t.pages.about.desc}
                breadcrumbs={[{ label: t.pages.about.title }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
                <main className="w-full space-y-20">
                    {/* Story Section */}
                    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 lg:p-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-brand-dark mb-6">Our Story</h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                    FinCompare BD was born out of a simple frustration: finding the right financial product in Bangladesh was too complicated. Hidden fees, jargon-heavy brochures, and aggressive sales tactics made it impossible for the average consumer to know if they were getting a good deal.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    We set out to change that by building the premier financial aggregator in the country. We analyze the fine print, calculate the true costs, and present 100% unbiased comparisons so you can make decisions with confidence.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-center justify-center min-h-[300px]">
                                <div className="text-center">
                                    <div className="text-5xl font-extrabold text-brand-blue mb-2">100k+</div>
                                    <div className="text-slate-500 font-medium">Monthly Users Empowered</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Values */}
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Core Values</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto">The principles that guide everything we build and every recommendation we make.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-blue transition-colors hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">Unbiased Data</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">We don't play favorites. Our algorithms rank products strictly based on user benefit and cost-efficiency, never on commissions.</p>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-green transition-colors hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center mb-6">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">Radical Transparency</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">We dig into the fine print to expose hidden fees, compound interest traps, and restrictive terms so you know exactly what you're signing up for.</p>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-blue transition-colors hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                                    <HeartHandshake className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">User First</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Your financial well-being is our ultimate metric for success. We build tools that save you time, money, and stress.</p>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-green transition-colors hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">Simplicity</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Finance is complicated enough. We strive to make our comparisons, calculators, and guides as simple and intuitive as possible.</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-brand-dark rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-6">Ready to make a better financial decision?</h2>
                            <p className="text-slate-300 mb-8 text-lg">Compare credit cards, find the lowest loan rates, or maximize your deposit returns today.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/cards" className="px-8 py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl transition-colors">
                                    Compare Credit Cards
                                </Link>
                                <Link href="/loans" className="px-8 py-4 bg-white hover:bg-slate-50 text-brand-dark font-bold rounded-xl transition-colors">
                                    Calculate Loan EMI
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
