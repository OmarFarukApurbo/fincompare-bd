import { getCreditCards } from '@/lib/api';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import CompareCardSelector from '@/components/CompareCardSelector';
import { Star, Check, Minus, CheckCircle2, ChevronRight, Scale, Info, Plus } from 'lucide-react';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ComparePage({ searchParams }: Props) {
    const sp = await searchParams;
    const idsString = sp.ids as string | undefined;
    const ids = idsString ? idsString.split(',').map(id => Number(id)).filter(id => !isNaN(id)) : [];

    const allCards = await getCreditCards();
    const comparedCards = allCards.filter((card: any) => ids.includes(card.id)).slice(0, 3);

    // Fill with empty slots if less than 3
    const maxComparison = 3;
    const emptySlots = Math.max(0, maxComparison - comparedCards.length);

    // List of comparison categories
    const categories: any[] = [
        { key: 'recommendation_score', label: 'Recommendation Score', render: (val: number) => val ? `${val}/10` : 'N/A' },
        {
            key: 'great_for', label: 'Great For', render: (val: string[]) => val && val.length > 0 ? (
                <ul className="space-y-1">{val.slice(0, 10).map((v, i) => <li key={i} className="flex gap-1.5 items-start text-xs"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-green flex-shrink-0" /> <span className="text-slate-600">{v}</span></li>)}</ul>
            ) : '-'
        },
        {
            key: 'annual_fee', label: 'Annual Fees', render: (val: string, card: any) => (
                <div>
                    <div className="font-bold text-slate-800">{val || 'BDT 0'}</div>
                    {card.fee_details ? (
                        <details className="mt-2 text-xs text-slate-500 cursor-pointer group">
                            <summary className="font-semibold text-brand-blue flex items-center gap-1 group-open:mb-2 outline-none">
                                View Full Fees <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="pl-4 border-l-2 border-slate-200 py-1 bg-slate-50 rounded-r-md mt-1 italic">{card.fee_details}</div>
                        </details>
                    ) : (
                        <div className="text-xs text-slate-500 mt-1">{card.fee_waived_condition}</div>
                    )}
                </div>
            )
        },
        { key: 'interest_rate', label: 'Yearly Interest Rate', render: (val: string) => <span className="font-semibold">{val || 'N/A'}</span> },
        { key: 'bonus_offers', label: 'Bonus/Offers', render: (val: string) => val ? <div className="text-sm whitespace-pre-wrap">{val}</div> : '-' },
        { key: 'rewards_program', label: 'Rewards Program', render: (val: string) => val ? <div className="text-sm whitespace-pre-wrap">{val}</div> : '-' },
        { key: 'emi_facilities', label: 'EMI Facilities', render: (val: string) => val ? <div className="text-sm whitespace-pre-wrap">{val}</div> : '-' },
        {
            key: 'advantages', label: 'Advantages', render: (val: string[]) => val && val.length > 0 ? (
                <ul className="space-y-1.5">{val.map((v, i) => <li key={i} className="flex gap-2 items-start text-sm"><CheckCircle2 className="w-4 h-4 mt-0.5 text-brand-green flex-shrink-0" /> <span className="text-slate-700">{v}</span></li>)}</ul>
            ) : '-'
        },
        {
            key: 'disadvantages', label: 'Disadvantages', render: (val: string[]) => val && val.length > 0 ? (
                <ul className="space-y-1.5">{val.map((v, i) => <li key={i} className="flex gap-2 items-start text-sm"><Minus className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" /> <span className="text-slate-700">{v}</span></li>)}</ul>
            ) : '-'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-12 flex flex-col">
            <Navbar />

            <PageHeader
                title="Compare Credit Cards"
                description="Side-by-side comparison of the best credit cards in Bangladesh to help you find the right fit."
                breadcrumbs={[
                    { label: "Credit Cards", href: "/cards" },
                    { label: "Compare" }
                ]}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12 mb-24 flex-1">

                {comparedCards.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
                        <div className="w-24 h-24 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                            <Scale className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">No Cards Selected for Comparison</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't added any credit cards to compare. Use the button below to add up to 3 cards and compare them side-by-side.</p>
                        <CompareCardSelector allCards={allCards} currentIds={ids} isFullWidth />
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr>
                                        {/* Categories Header Column */}
                                        <th className="w-1/4 p-6 bg-slate-50 border-r border-slate-200 align-bottom">
                                            <h3 className="text-lg font-bold text-slate-800">Card Features</h3>
                                            <p className="text-xs text-slate-500 mt-1">Comparing {comparedCards.length} cards</p>
                                        </th>

                                        {/* Cards Header Columns */}
                                        {comparedCards.map((card: any) => (
                                            <th key={card.id} className="w-1/4 p-6 border-r border-slate-200 relative group align-top bg-white">
                                                <div className="absolute top-4 right-4 z-10">
                                                    <Link
                                                        href={`/cards/compare?ids=${comparedCards.filter((c: any) => c.id !== card.id).map((c: any) => c.id).join(',')}`}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                        title="Remove from comparison"
                                                    >
                                                        &times;
                                                    </Link>
                                                </div>
                                                <div className="w-full aspect-[1.586/1] rounded-xl relative overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 mb-4 group-hover:shadow-md transition-shadow">
                                                    {card.image_url ? (
                                                        <Image src={card.image_url} alt={card.name} fill className="object-contain p-2" unoptimized />
                                                    ) : (
                                                        <div className={`w-full h-full bg-gradient-to-br ${card.color}`}></div>
                                                    )}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{card.bank}</div>
                                                <h4 className="text-xl font-bold text-brand-dark leading-tight mb-2">{card.name}</h4>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                                                    <div className="flex items-center text-amber-500">
                                                        <Star className="w-3.5 h-3.5 fill-current" />
                                                        <span className="font-bold text-slate-700 ml-1">{card.rating}</span>
                                                    </div>
                                                </div>
                                                <button className="w-full py-2.5 rounded-lg font-bold text-sm bg-brand-blue text-white hover:bg-blue-700 transition-colors">
                                                    Apply Now
                                                </button>
                                            </th>
                                        ))}

                                        {/* Empty Placeholder Columns */}
                                        {Array.from({ length: emptySlots }).map((_, i) => (
                                            <th key={`empty-${i}`} className="w-1/4 p-6 border-r border-slate-200 align-top bg-slate-50/50 hidden md:table-cell">
                                                <CompareCardSelector allCards={allCards} currentIds={ids} />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, rowIndex) => (
                                        <tr key={category.key} className="border-t border-slate-200 group hover:bg-slate-50/50 transition-colors">
                                            {/* Category Label */}
                                            <td className="p-6 bg-slate-50 border-r border-slate-200 font-semibold text-slate-700 text-sm w-1/4 shadow-[inset_-1px_0_0_#e2e8f0]">
                                                {category.label}
                                            </td>

                                            {/* Data Cells */}
                                            {comparedCards.map((card: any) => (
                                                <td key={`${card.id}-${category.key}`} className="p-6 border-r border-slate-200 w-1/4 align-top">
                                                    {category.render(card[category.key], card)}
                                                </td>
                                            ))}

                                            {/* Empty Slots */}
                                            {Array.from({ length: emptySlots }).map((_, i) => (
                                                <td key={`empty-cell-${rowIndex}-${i}`} className="p-6 border-r border-slate-200 bg-slate-50/30 w-1/4 hidden md:table-cell"></td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Guide Section */}
                <div className="bg-gradient-to-br from-brand-dark to-[#0a192f] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 text-blue-200 font-semibold text-sm mb-6 border border-brand-blue/30">
                            <Info className="w-4 h-4" /> Comparison Guide
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">How to choose the perfect credit card?</h2>

                        <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded bg-brand-blue text-white flex items-center justify-center text-xs">1</div> Needs vs Rewards</h3>
                                    <p className="text-sm leading-relaxed">Consider what you spend the most on. If you travel frequently, look for cards offering lounge access and air miles. If you dine out often, prioritize cashback on restaurants.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded bg-brand-blue text-white flex items-center justify-center text-xs">2</div> Understand the Fees</h3>
                                    <p className="text-sm leading-relaxed">Always check the annual fee and the condition for waiver. A premium card with a high fee might be worth it if the rewards outvalue the cost significantly.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded bg-brand-blue text-white flex items-center justify-center text-xs">3</div> Interest Rates</h3>
                                    <p className="text-sm leading-relaxed">If you plan on carrying a balance from month to month, the interest rate (APR) is your most critical factor. Choose the lowest possible rate.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><div className="w-6 h-6 rounded bg-brand-blue text-white flex items-center justify-center text-xs">4</div> Watch out for Disadvantages</h3>
                                    <p className="text-sm leading-relaxed">Check our Disadvantages section to uncover hidden fees, strict eligibility rules, or poor reward redemption rates before making a commitment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
