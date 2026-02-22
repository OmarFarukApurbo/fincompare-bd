"use client";

import { useState, useEffect } from 'react';
import { Check, Star, Info, ArrowRight, ShieldCheck, ChevronDown, FileText, UserCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import LeadCaptureModal from './LeadCaptureModal';
import { getCreditCards } from '@/lib/api';

type AccordionKey = `${number}-${'docs' | 'eligibility'}`;

interface ProductComparisonTableProps {
    hideHeader?: boolean;
    hideViewAll?: boolean;
    transparentBg?: boolean;
    condensed?: boolean;
}

export default function ProductComparisonTable({ hideHeader = false, hideViewAll = false, transparentBg = false, condensed = false }: ProductComparisonTableProps) {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [openAccordions, setOpenAccordions] = useState<Set<AccordionKey>>(new Set());

    const toggleAccordion = (key: AccordionKey) => {
        setOpenAccordions(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const [cards, setCards] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCards() {
            setIsLoading(true);
            try {
                const data = await getCreditCards();
                setCards(data || []);
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCards();
    }, []);

    return (
        <div className={`${condensed ? 'py-0' : 'py-24'} ${transparentBg ? '' : 'bg-white'}`}>
            <div className={`${condensed ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
                {/* Section Header */}
                {!hideHeader && (
                    <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-sm mb-4 border border-brand-blue/20">
                                <ShieldCheck className="w-4 h-4" /> 100% Unbiased Data
                            </div>
                            <h2 className="text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
                                Top Credit Cards This Month
                            </h2>
                            <p className="text-xl text-slate-500 max-w-2xl">
                                Compare features, fees, and rewards to find the perfect credit card for your lifestyle.
                            </p>
                        </div>
                        {!hideViewAll && (
                            <div>
                                <button className="text-brand-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                    View all 45+ Credit Cards <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Comparison Grid */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center font-semibold text-slate-500 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                        Fetching latest credit cards...
                    </div>
                ) : (
                    <div className={`grid gap-8 items-start ${condensed ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                        {cards.map((card) => (
                            <div key={card.id} className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col">
                                {/* Popular Badge */}
                                {card.isPopular && (
                                    <div className="absolute top-0 right-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-md z-10">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Card Header & Visual */}
                                <div className="p-6 pb-0 relative">
                                    <div className={`w-full aspect-[1.586/1] rounded-2xl ${card.image_url ? 'bg-transparent' : `bg-gradient-to-br ${card.color} shadow-lg`} relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500`}>
                                        {card.image_url ? (
                                            <Image
                                                src={card.image_url}
                                                alt={card.name}
                                                fill
                                                className="object-contain"
                                                unoptimized // Supabase storage URLs
                                            />
                                        ) : (
                                            <>
                                                {/* Abstract Card Details (Fallback) */}
                                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                                <div className="absolute top-4 left-4">
                                                    <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-sm border border-white/30"></div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                    <div>
                                                        <div className="text-white/80 text-xs font-mono mb-1">•••• •••• •••• 1234</div>
                                                        <div className="text-white font-semibold text-sm">{card.bank}</div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-inner flex items-center justify-center">
                                                        <div className="w-6 h-6 rounded-full bg-white/40"></div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Card Content body */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-6">
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${card.badgeColor}`}>
                                            {card.highlight}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{card.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-slate-500">
                                            <div className="flex items-center text-amber-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="font-bold text-slate-700 ml-1">{card.rating}</span>
                                            </div>
                                            <span>({card.reviews} Reviews)</span>
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div className="space-y-3 mb-8 flex-grow">
                                        {card.features?.map((feature: string, i: number) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Metrics container */}
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 mb-8">
                                        <div>
                                            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                Annual Fee <Info className="w-3 h-3" />
                                            </div>
                                            <div className="font-bold text-slate-900">{card.annualFee}</div>
                                            <div className="text-xs text-emerald-600 font-medium">{card.feeWaived}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                Interest Rate <Info className="w-3 h-3" />
                                            </div>
                                            <div className="font-bold text-slate-900">{card.interestRate}</div>
                                        </div>
                                    </div>

                                    {/* Accordions */}
                                    <div className="space-y-2 mb-6">
                                        {/* Required Documents */}
                                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => toggleAccordion(`${card.id}-docs`)}
                                                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                            >
                                                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                    <FileText className="w-4 h-4 text-brand-blue" />
                                                    Required Documents
                                                </span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openAccordions.has(`${card.id}-docs` as AccordionKey) ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {openAccordions.has(`${card.id}-docs` as AccordionKey) && (
                                                <div className="px-4 py-3 bg-white border-t border-slate-100">
                                                    <ul className="space-y-2">
                                                        {card.documents?.map((doc: string, i: number) => (
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
                                                onClick={() => toggleAccordion(`${card.id}-eligibility`)}
                                                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                            >
                                                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                    <UserCheck className="w-4 h-4 text-emerald-600" />
                                                    Eligibility Criteria
                                                </span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openAccordions.has(`${card.id}-eligibility` as AccordionKey) ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {openAccordions.has(`${card.id}-eligibility` as AccordionKey) && (
                                                <div className="px-4 py-3 bg-white border-t border-slate-100">
                                                    <ul className="space-y-2">
                                                        {card.eligibility?.map((rule: string, i: number) => (
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
                                    <button
                                        onClick={() => setSelectedProduct(`${card.bank} ${card.name}`)}
                                        className="w-full py-4 rounded-xl font-bold text-lg bg-slate-50 text-brand-dark border-2 border-slate-200 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <LeadCaptureModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct || ''}
            />
        </div>
    );
}
