"use client";

import { useState, useEffect } from 'react';
import { Check, Star, Info, Banknote, ChevronDown, FileText, UserCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getLoans } from '@/lib/api';

type AccordionKey = `${number}-${'docs' | 'eligibility'}`;

export default function LoanComparisonTable() {
    const categories = ['Personal Loan', 'Home Loan', 'Auto Loan', 'Business Loan'];
    const [activeCategory, setActiveCategory] = useState('Personal Loan');
    const [openAccordions, setOpenAccordions] = useState<Set<AccordionKey>>(new Set());
    const [allLoans, setAllLoans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleAccordion = (key: AccordionKey) => {
        setOpenAccordions(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    useEffect(() => {
        async function fetchLoans() {
            setIsLoading(true);
            try {
                const data = await getLoans();
                setAllLoans(data || []);
            } catch (error) {
                console.error("Failed to fetch loans:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLoans();
    }, []);

    const filteredLoans = allLoans.filter(loan => loan.category === activeCategory);

    return (
        <div className="py-2 bg-transparent">
            {/* Category Navigation Bar */}
            <div className="mb-10 flex border-b border-slate-200 overflow-x-auto no-scrollbar pt-2">
                <div className="flex space-x-8 min-w-max px-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeCategory === cat
                                ? 'text-brand-blue'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue rounded-t-full shadow-[0_0_10px_rgba(15,60,126,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Attractive Header */}
            <div className="mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-brand-dark mb-2">
                        Compare {activeCategory === 'Business Loan' ? 'Business Loans' : activeCategory + 's'}
                    </h2>
                    <p className="text-slate-500 text-sm max-w-xl">
                        {activeCategory === 'Personal Loan' && "Find the lowest interest rates for your personal needs with quick processing times."}
                        {activeCategory === 'Home Loan' && "Build your dream home with the best mortgage rates and flexible tenures."}
                        {activeCategory === 'Auto Loan' && "Hit the road with top car financing options and up to 100% vehicle coverage."}
                        {activeCategory === 'Business Loan' && "Scale your enterprise with subsidized SME loans and robust working capital."}
                    </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200">
                    {activeCategory === 'Personal Loan' && <Banknote className="w-8 h-8 text-blue-600" />}
                    {activeCategory === 'Home Loan' && <Banknote className="w-8 h-8 text-slate-800" />}
                    {activeCategory === 'Auto Loan' && <Banknote className="w-8 h-8 text-amber-500" />}
                    {activeCategory === 'Business Loan' && <Banknote className="w-8 h-8 text-indigo-600" />}
                </div>
            </div>

            {/* Comparison Grid */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center font-semibold text-slate-500 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                    Fetching latest loans...
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8 pb-12 items-start">
                    {filteredLoans.map((loan) => (
                        <div key={loan.id} className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col">
                            {/* Popular Badge */}
                            {loan.isPopular && (
                                <div className="absolute top-0 right-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-md z-10">
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Loan Visual Header */}
                            <div className="p-6 pb-0 relative">
                                <div className={`w-full h-48 rounded-2xl ${loan.image_url ? 'bg-transparent' : `bg-gradient-to-br ${loan.color} shadow-lg`} relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500`}>
                                    {loan.image_url ? (
                                        <Image
                                            src={loan.image_url}
                                            alt={loan.name}
                                            fill
                                            className="object-cover"
                                            unoptimized // Supabase storage URLs
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                            <div className="absolute top-4 left-4">
                                                <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-sm border border-white/30"></div>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                <div>
                                                    <div className="text-white/80 font-bold tracking-wider text-xs uppercase mb-1">{loan.category}</div>
                                                    <div className="text-white font-semibold text-sm">{loan.bank}</div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-inner flex items-center justify-center">
                                                    <Banknote className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Loan Content body */}
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="mb-6">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${loan.badgeColor}`}>
                                        {loan.highlight}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{loan.name}</h3>
                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                        <div className="flex items-center text-amber-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold text-slate-700 ml-1">{loan.rating}</span>
                                        </div>
                                        <span>({loan.reviews} Reviews)</span>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="space-y-3 mb-8 flex-grow">
                                    {loan.features?.map((feature: string, i: number) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-slate-600 text-sm leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 mb-5">
                                    <div>
                                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                            Processing Fee <Info className="w-3 h-3" />
                                        </div>
                                        <div className="font-bold text-slate-900">{loan.processingFee}</div>
                                        <div className="text-xs text-emerald-600 font-medium">{loan.feeDetails}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                            Interest Rate <Info className="w-3 h-3" />
                                        </div>
                                        <div className="font-bold text-slate-900">{loan.interestRate}</div>
                                    </div>
                                </div>

                                {/* Accordions */}
                                <div className="space-y-2 mb-6">
                                    {/* Required Documents */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleAccordion(`${loan.id}-docs`)}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                        >
                                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <FileText className="w-4 h-4 text-brand-blue" />
                                                Required Documents
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openAccordions.has(`${loan.id}-docs` as AccordionKey) ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {openAccordions.has(`${loan.id}-docs` as AccordionKey) && (
                                            <div className="px-4 py-3 bg-white border-t border-slate-100">
                                                <ul className="space-y-2">
                                                    {loan.documents?.map((doc: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                            <span className="mt-1 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-600">{i + 1}</span>
                                                            {doc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Eligibility Criteria */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleAccordion(`${loan.id}-eligibility`)}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                        >
                                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <UserCheck className="w-4 h-4 text-emerald-600" />
                                                Eligibility Criteria
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openAccordions.has(`${loan.id}-eligibility` as AccordionKey) ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {openAccordions.has(`${loan.id}-eligibility` as AccordionKey) && (
                                            <div className="px-4 py-3 bg-white border-t border-slate-100">
                                                <ul className="space-y-2">
                                                    {loan.eligibility?.map((rule: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                            {rule}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Call to action */}
                                <button className="w-full py-4 rounded-xl font-bold text-lg bg-slate-50 text-brand-dark border-2 border-slate-200 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && filteredLoans.length === 0 && (
                <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-200 rounded-3xl">
                    No loans available in this category yet.
                </div>
            )}
        </div>
    );
}
