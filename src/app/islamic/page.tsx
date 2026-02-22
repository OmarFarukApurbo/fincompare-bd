"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Star, ShieldCheck, ChevronRight, CheckCircle2, ChevronDown, ChevronUp, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import Image from "next/image";
import { useState, useEffect } from 'react';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { getShariahCards } from '@/lib/api';

// ─── Mock Data for Islamic Products (Remaining) ──────────────────────────────────────────

const DEPOSIT_SCHEMES = [
    {
        id: 1,
        name: "Mudaraba Monthly Savings Scheme",
        bank: "Islami Bank Bangladesh PLC",
        term: "3, 5, 8, 10 Years",
        profit_sharing_ratio: "65:35 (Bank:Client)",
        features: ["Installments from ৳ 500", "Profit calculated daily, paid on maturity"],
    },
    {
        id: 2,
        name: "Mudaraba Term Deposit (MTDR)",
        bank: "Shahjalal Islami Bank",
        term: "1 to 36 Months",
        profit_sharing_ratio: "Provisional Rate 7.50%",
        features: ["Minimum deposit ৳ 10,000", "Auto-renewal facility available"],
    }
];

const FINANCING_OPTIONS = [
    {
        id: 1,
        name: "Bai-Murabaha Home Finance",
        bank: "Standard Chartered Saadiq",
        concept: "Cost-Plus Financing",
        max_amount: "৳ 2 Crore",
        features: ["Property purchased by bank and sold to client at a profit", "Fixed monthly installments"],
    },
    {
        id: 2,
        name: "HPSM Auto Finance",
        bank: "Islami Bank Bangladesh PLC",
        concept: "Hire Purchase under Shirkatul Meilk",
        max_amount: "৳ 40 Lac",
        features: ["Joint purchase of vehicle", "Client pays rent for bank's share until ownership is transferred"],
    }
];

export default function IslamicFinancePage() {
    const { t } = useI18n();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

    const [shariahCards, setShariahCards] = useState<any[]>([]);
    const [isLoadingCards, setIsLoadingCards] = useState(true);

    useEffect(() => {
        async function fetchCards() {
            setIsLoadingCards(true);
            try {
                const data = await getShariahCards();
                setShariahCards(data || []);
            } catch (error) {
                console.error("Failed to fetch shariah cards:", error);
            } finally {
                setIsLoadingCards(false);
            }
        }
        fetchCards();
    }, []);

    const toggleExpand = (id: number) => {
        if (expandedCardId === id) {
            setExpandedCardId(null);
        } else {
            setExpandedCardId(id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-20">
            <Navbar />

            <PageHeader
                title="Islamic Finance Hub"
                description="Compare Shariah-compliant Mudaraba deposits, Ujrah-based cards, and Halal financing options in Bangladesh."
                breadcrumbs={[{ label: 'Islamic Finance' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                <div className="space-y-12">

                    {/* Educational Banner */}
                    <div className="bg-gradient-to-br from-emerald-800 to-brand-green rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
                            <Star className="w-96 h-96" />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-50 text-xs font-bold uppercase tracking-wide mb-4">
                                <ShieldCheck className="w-4 h-4" /> Ethics FIRST
                            </div>
                            <h2 className="text-3xl font-extrabold mb-4">Banking backed by real assets, not debt.</h2>
                            <p className="text-emerald-50/90 text-lg leading-relaxed mb-6">
                                Islamic finance requires transactions to be backed by tangible assets. It strictly prohibits Riba (interest), Gharar (speculation), and investing in prohibited sectors. Instead of interest, it relies on profit/loss sharing or cost-plus financing.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                    <h3 className="font-bold text-lg mb-1">Mudaraba</h3>
                                    <p className="text-sm opacity-80">Profit-sharing partnership where one supplies capital and the other supplies expertise.</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                    <h3 className="font-bold text-lg mb-1">Murabaha</h3>
                                    <p className="text-sm opacity-80">Cost-plus financing. The bank buys an asset and sells it to you at a declared profit margin.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Shariah Compliant Cards */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                                <Star className="w-6 h-6 text-emerald-500" /> Top Shariah-Compliant Cards
                            </h2>

                            {isLoadingCards ? (
                                <div className="py-20 flex flex-col items-center justify-center font-semibold text-slate-500 gap-4">
                                    <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                                    Fetching cards...
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {shariahCards.map(card => (
                                        <div key={card.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            {card.image_url && (
                                                <div className="w-full h-48 mb-6 relative rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
                                                    <Image
                                                        src={card.image_url}
                                                        alt={card.name}
                                                        fill
                                                        className="object-contain"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{card.bank}</div>
                                                    <h3 className="font-extrabold text-xl text-slate-800 mb-1">{card.name}</h3>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                                                        <div className="flex items-center text-amber-500">
                                                            <Star className="w-4 h-4 fill-current" />
                                                            <span className="font-bold text-slate-700 ml-1">{card.rating}</span>
                                                        </div>
                                                        <span>({card.reviews} Reviews)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 bg-slate-50 inline-flex px-3 py-1 rounded-lg">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                        {card.type} Structure
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {card.features?.map((f: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 min-w-[180px] flex flex-col justify-center gap-6">
                                                    <div>
                                                        <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Annual Fee</div>
                                                        <div className="font-bold text-brand-dark text-xl">{card.annual_fee}</div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={() => setSelectedProduct(`${card.bank} ${card.name}`)}
                                                            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-4 py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-1 shadow-sm"
                                                        >
                                                            Apply Now
                                                        </button>
                                                        <button
                                                            onClick={() => toggleExpand(card.id)}
                                                            className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-4 py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-1"
                                                        >
                                                            {expandedCardId === card.id ? 'Hide Details' : 'View Details'}
                                                            {expandedCardId === card.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable Details Section */}
                                            <div className={`grid transition-all duration-300 ease-in-out origin-top ${expandedCardId === card.id ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-transparent'}`}>
                                                <div className="overflow-hidden">
                                                    <div className="grid md:grid-cols-3 gap-6">
                                                        {/* Facilities */}
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Facilities & Perks</h4>
                                                            <ul className="space-y-2">
                                                                {card.details?.facilities?.map((item: string, idx: number) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Eligibility */}
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Eligibility</h4>
                                                            <ul className="space-y-2">
                                                                {card.details?.eligibility?.map((item: string, idx: number) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Documents Required */}
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5"><FileText className="w-4 h-4 text-emerald-500" /> Required Docs</h4>
                                                            <ul className="space-y-2">
                                                                {card.details?.documents?.map((item: string, idx: number) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Deposit Schemes Widget */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3">
                                    Mudaraba Deposits
                                </h3>
                                <div className="space-y-5">
                                    {DEPOSIT_SCHEMES.map(scheme => (
                                        <div key={scheme.id} className="group cursor-pointer">
                                            <div className="text-xs font-semibold text-emerald-600 uppercase mb-1">{scheme.bank}</div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{scheme.name}</h4>
                                            <div className="text-sm text-slate-600 mt-1 mb-2">Ratio: {scheme.profit_sharing_ratio}</div>
                                            <div className="text-xs text-brand-blue font-semibold flex items-center gap-1">
                                                Explore scheme <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Financing Options Widget */}
                            <div className="bg-slate-800 rounded-3xl shadow-sm p-6 text-white overflow-hidden relative">
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <ShieldCheck className="w-48 h-48" />
                                </div>
                                <h3 className="text-lg font-bold mb-5 border-b border-slate-700 pb-3 relative z-10">
                                    Halal Financing
                                </h3>
                                <div className="space-y-6 relative z-10">
                                    {FINANCING_OPTIONS.map(finance => (
                                        <div key={finance.id}>
                                            <div className="text-xs font-semibold text-emerald-400 mb-1">{finance.concept}</div>
                                            <h4 className="font-bold text-white mb-1">{finance.name}</h4>
                                            <p className="text-sm text-slate-300 mb-2 line-clamp-2">{finance.features[0]}</p>
                                            <button className="text-xs font-bold text-white border border-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">
                                                Learn More
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <LeadCaptureModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct || ''}
            />
        </div>
    );
}
