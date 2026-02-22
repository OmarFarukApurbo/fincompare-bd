"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Star, Info, ArrowRight, ShieldCheck, ChevronDown, FileText, UserCheck, Loader2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import LeadCaptureModal from './LeadCaptureModal';
import { getCreditCards } from '@/lib/api';

type AccordionKey = `${number}-${'docs' | 'eligibility'}`;

interface ProductComparisonTableProps {
    hideHeader?: boolean;
    hideViewAll?: boolean;
    transparentBg?: boolean;
    condensed?: boolean;
    activeFilters?: Record<string, string[]>;
}

export default function ProductComparisonTable({
    hideHeader = false,
    hideViewAll = false,
    transparentBg = false,
    condensed = false,
    activeFilters = {}
}: ProductComparisonTableProps) {
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
    const [compareList, setCompareList] = useState<any[]>([]);

    const toggleCompare = (card: any) => {
        setCompareList(prev => {
            const isAlreadyAdded = prev.some(c => c.id === card.id);
            if (isAlreadyAdded) {
                return prev.filter(c => c.id !== card.id);
            } else {
                if (prev.length >= 3) {
                    alert("You can only compare up to 3 cards.");
                    return prev;
                }
                return [...prev, card];
            }
        });
    };

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
                        {(() => {
                            const filteredCards = cards.filter(card => {
                                // Check Card Network
                                if (activeFilters["Card Network"]?.length) {
                                    const matchesNetwork = activeFilters["Card Network"].some(net =>
                                        (card.name + ' ' + card.bank).toLowerCase().includes(net.toLowerCase()) ||
                                        (net === "American Express" && card.name.toLowerCase().includes("amex"))
                                    );
                                    if (!matchesNetwork) return false;
                                }

                                // Check Card Type
                                if (activeFilters["Card Type"]?.length) {
                                    const matchesType = activeFilters["Card Type"].some(type =>
                                        (card.highlight || '').toLowerCase().includes(type.split(' ')[0].toLowerCase()) ||
                                        (card.name || '').toLowerCase().includes(type.toLowerCase())
                                    );
                                    if (!matchesType) return false;
                                }

                                // Check Annual Fee
                                if (activeFilters["Annual Fee"]?.length) {
                                    const feeStr = (card.annual_fee || card.annualFee || '').toLowerCase();
                                    const matchesFee = activeFilters["Annual Fee"].some(feeType => {
                                        if (feeType === "No Annual Fee") return feeStr.includes("free") || feeStr.includes("0") || feeStr.includes("no fee") || feeStr.includes("waived");
                                        if (feeType === "First Year Free") return feeStr.includes("first year") || feeStr.includes("waived condition");
                                        if (feeType.includes("Premium")) return feeStr.includes("5000") || feeStr.includes("10000");
                                        return true;
                                    });
                                    if (!matchesFee) return false;
                                }

                                return true;
                            });

                            if (filteredCards.length === 0) {
                                return (
                                    <div className="col-span-full py-12 text-center text-slate-500">
                                        No credit cards match your selected filters. Try clearing some filters.
                                    </div>
                                );
                            }

                            return filteredCards.map((card) => (
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
                                                <div className="font-bold text-slate-900">{card.annual_fee || card.annualFee || 'BDT 0'}</div>
                                                <div className="text-xs text-emerald-600 font-medium">{card.feeWaived}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                    Interest Rate <Info className="w-3 h-3" />
                                                </div>
                                                <div className="font-bold text-slate-900">{card.interest_rate || card.interestRate || 'N/A'}</div>
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

                                        {/* Compare Checkbox */}
                                        <div className="mb-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                            <label className="flex items-center gap-2 cursor-pointer group/compare w-max">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${compareList.some(c => c.id === card.id) ? 'bg-brand-blue border-brand-blue' : 'border-slate-300 bg-white group-hover/compare:border-brand-blue'}`}>
                                                    {compareList.some(c => c.id === card.id) && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-600 select-none group-hover/compare:text-brand-blue transition-colors">Add to Compare</span>
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={compareList.some(c => c.id === card.id)}
                                                    onChange={() => toggleCompare(card)}
                                                />
                                            </label>
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
                            ));
                        })()}
                    </div>
                )}
            </div>

            {/* Floating Compare Bar */}
            {compareList.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 md:p-6 translate-y-0 transition-transform duration-300">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                            <h4 className="font-bold text-slate-800 hidden md:block whitespace-nowrap">Comparing {compareList.length}/3:</h4>
                            <div className="flex gap-3 flex-nowrap">
                                {compareList.map(c => (
                                    <div key={c.id} className="relative bg-slate-50 border border-slate-200 rounded-lg p-2 pr-8 flex items-center gap-3 w-[160px] flex-shrink-0">
                                        <button
                                            onClick={() => toggleCompare(c)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        >
                                            &times;
                                        </button>
                                        <div className="w-10 h-10 relative rounded overflow-hidden flex-shrink-0 bg-white border border-slate-200 flex items-center justify-center">
                                            {c.image_url ? (
                                                <Image src={c.image_url} alt={c.name} fill className="object-contain p-1" unoptimized />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${c.color}`}></div>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{c.bank}</div>
                                            <div className="text-xs font-semibold text-slate-700 truncate">{c.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                            <button
                                onClick={() => setCompareList([])}
                                className="px-6 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 w-full md:w-auto transition-colors"
                            >
                                Clear All
                            </button>
                            <Link
                                href={`/cards/compare?ids=${compareList.map(c => c.id).join(',')}`}
                                className="px-8 py-3 rounded-xl font-bold text-white bg-brand-blue hover:bg-blue-700 w-full md:w-auto text-center transition-colors shadow-lg shadow-brand-blue/30"
                            >
                                Compare Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <LeadCaptureModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct || ''}
            />
        </div>
    );
}
