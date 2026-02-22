"use client";

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Info, Calculator, FileText, Calendar, Building, Landmark, ShieldCheck } from 'lucide-react';

// ─── Tax Data (FY 2024-25 Bangladesh) ───────────────────────────────────────

const TAX_SLABS = [
    { upTo: 350000, rate: 0, label: 'Up to ৳3,50,000' },
    { upTo: 100000, rate: 0.05, label: 'Next ৳1,00,000' },
    { upTo: 300000, rate: 0.10, label: 'Next ৳3,00,000' },
    { upTo: 400000, rate: 0.15, label: 'Next ৳4,00,000' },
    { upTo: 500000, rate: 0.20, label: 'Next ৳5,00,000' },
    { upTo: Infinity, rate: 0.25, label: 'Above ৳13,50,000' },
];

function calcTax(income: number): { gross: number, breakdown: { band: string, amount: number, rate: string }[] } {
    let remaining = income;
    let gross = 0;
    const breakdown = [];

    for (const slab of TAX_SLABS) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, slab.upTo);
        const slabTax = taxable * slab.rate;
        gross += slabTax;

        breakdown.push({
            band: slab.label,
            amount: slabTax,
            rate: slab.rate === 0 ? '0%' : `${slab.rate * 100}%`
        });

        remaining -= taxable;
    }
    return { gross, breakdown };
}

function formatBDT(n: number) {
    return '৳' + Math.round(n).toLocaleString('en-IN');
}

export default function TaxPage() {
    const [income, setIncome] = useState('');
    const [investment, setInvestment] = useState('');

    const inc = parseFloat(income.replace(/,/g, '')) || 0;
    const inv = parseFloat(investment.replace(/,/g, '')) || 0;

    const { gross: grossTax, breakdown } = calcTax(inc);

    // Investment rebate: 15% on eligible investment, max 25% of income or ৳10,00,000 (ignoring exceptions for specific bonds for simplicity in general calc)
    const maxEligible = Math.min(inc * 0.25, 1000000);
    const eligibleInv = Math.min(inv, maxEligible);
    const rebate = eligibleInv * 0.15;

    // Minimum tax logic (simplified for city corporation area assumed)
    let minTax = 0;
    if (inc > 350000) minTax = 5000;

    let finalTax = grossTax - rebate;
    if (finalTax < minTax && inc > 350000) finalTax = minTax;

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-20">
            <Navbar />

            <PageHeader
                title="Bangladesh Tax Guide 2024-25"
                description="Everything you need to know about income tax calculation, rebates, and e-Return filing in BD."
                breadcrumbs={[{ label: 'Tax Guide' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-14 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Calculator */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold text-brand-dark">Tax & Rebate Calculator</h2>
                                    <p className="text-slate-500 text-sm">Estimate your tax liability based on the latest FY 2024-25 budget.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Inputs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Total Annual Income (BDT)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">৳</span>
                                            <input
                                                type="number"
                                                value={income}
                                                onChange={e => setIncome(e.target.value)}
                                                placeholder="0"
                                                min={0}
                                                className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-slate-200 rounded-2xl focus:border-violet-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Eligible Investments (BDT)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">৳</span>
                                            <input
                                                type="number"
                                                value={investment}
                                                onChange={e => setInvestment(e.target.value)}
                                                placeholder="0"
                                                min={0}
                                                className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-slate-200 rounded-2xl focus:border-violet-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Grid */}
                                {inc > 0 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                        {/* Top Level Numbers */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Gross Tax</p>
                                                <p className="text-3xl font-extrabold text-slate-800">{formatBDT(grossTax)}</p>
                                            </div>
                                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                                                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">Tax Rebate</p>
                                                <p className="text-3xl font-extrabold text-emerald-700">− {formatBDT(rebate)}</p>
                                                <p className="text-xs text-emerald-500 mt-1">15% on {formatBDT(eligibleInv)}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-5 text-center text-white shadow-lg shadow-violet-200">
                                                <p className="text-xs opacity-80 font-semibold uppercase tracking-wider mb-1">Final Tax Payable</p>
                                                <p className="text-3xl font-extrabold">{formatBDT(finalTax)}</p>
                                                {finalTax === minTax && minTax > 0 && (
                                                    <p className="text-xs opacity-90 mt-1 bg-white/20 inline-block px-2 py-0.5 rounded-full">Minimum tax applied</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Breakdown Box */}
                                        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                            <h4 className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-blue-100 flex items-center justify-between">
                                                Gross Tax Breakdown
                                                <span className="text-xs font-normal text-slate-500">Based on general slabs</span>
                                            </h4>
                                            <div className="space-y-3">
                                                {breakdown.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-600 font-medium">
                                                            {item.band} <span className="text-slate-400 ml-1">({item.rate})</span>
                                                        </span>
                                                        <span className="font-bold text-slate-800">
                                                            {formatBDT(item.amount)}
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="pt-3 mt-3 border-t border-blue-100 flex justify-between items-center text-sm">
                                                    <span className="text-slate-800 font-bold uppercase tracking-wide">Total Gross Tax</span>
                                                    <span className="font-extrabold text-brand-blue text-base">{formatBDT(grossTax)}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Guide Section */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 sm:p-10 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-violet-500" />
                                    How to Submit Your Tax Return
                                </h3>

                                <div className="space-y-6 text-sm text-slate-600">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-base mb-1">Online e-Return (Mandatory for many)</h4>
                                            <p>Since 2024, online filing at <a href="http://www.etaxnbr.gov.bd" target="_blank" rel="noreferrer" className="text-brand-blue font-medium hover:underline">etaxnbr.gov.bd</a> is highly encouraged, and mandatory for government employees in specific city corporations (Dhaka, Gazipur, Narayanganj) and employees of certain large companies.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-base mb-1">Registration Requirements</h4>
                                            <p>You need your 12-digit e-TIN and a mobile number that is biometrically verified with your National ID (NID).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-base mb-1">Payment & Proof</h4>
                                            <p>Taxes can be paid directly through the portal via A-Challan (Card, Mobile Banking, Internet Banking). You can download your slip and PSR (Proof of Submission of Return) instantly.</p>
                                            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium flex gap-2 items-start">
                                                <Calendar className="w-4 h-4 shrink-0 mt-0.5" />
                                                <p><strong>Deadline:</strong> The due date for filing individual income tax returns is generally November 30th (National Tax Day).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-10 bg-slate-50">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Required Documents</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {[
                                        'NID and TIN Certificate',
                                        'Salary Certificate with breakdown',
                                        'Bank Statement (July 1 to June 30)',
                                        'Investment Proofs (DPS, Sanchaypatra, Insurance)',
                                        'TDS Challans (if tax was deducted at source)',
                                        'Previous year\'s tax return copy'
                                    ].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-2 text-slate-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                                            {doc}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Reference Tables */}
                    <div className="space-y-6">
                        {/* Slab Table */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center justify-between">
                                FY 2024-25 Tax Slabs
                            </h3>
                            <div className="overflow-hidden rounded-xl border border-slate-200">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-600">Income Band</th>
                                            <th className="text-right px-4 py-3 font-semibold text-slate-600">Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[
                                            { band: 'Up to ৳3,50,000', rate: '0% (Nil)' },
                                            { band: 'Next ৳1,00,000', rate: '5%' },
                                            { band: 'Next ৳3,00,000', rate: '10%' },
                                            { band: 'Next ৳4,00,000', rate: '15%' },
                                            { band: 'Next ৳5,00,000', rate: '20%' },
                                            { band: 'Above ৳13,50,000', rate: '25%' },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50">
                                                <td className="px-4 py-3 text-slate-700">{row.band}</td>
                                                <td className="px-4 py-3 text-right font-semibold text-brand-dark">{row.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 space-y-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="flex justify-between"><span>Women & Seniors (65+):</span> <span className="font-semibold text-slate-700">৳400,000</span></p>
                                <p className="flex justify-between"><span>Persons with disabilities:</span> <span className="font-semibold text-slate-700">৳475,000</span></p>
                                <p className="flex justify-between"><span>Minimum Tax (City Corp):</span> <span className="font-semibold text-slate-700">৳5,000</span></p>
                            </div>
                        </div>

                        {/* Rebate Rules */}
                        <div className="bg-emerald-50 rounded-3xl border border-emerald-100 p-6">
                            <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                Tax Rebate Rules
                            </h3>
                            <p className="text-sm text-emerald-800 mb-4">
                                You can claim a rebate of <strong className="text-emerald-900 bg-emerald-200/50 px-1 rounded">15%</strong> of your eligible investment amount.
                            </p>

                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Maximum Limit</h4>
                            <p className="text-sm text-emerald-800 mb-4">
                                The maximum investment amount eligible for rebate is <strong>25% of your total taxable income</strong>, capped at ৳1,50,00,000.
                            </p>

                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Eligible Sectors</h4>
                            <ul className="space-y-2 text-sm text-emerald-800">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    DPS (Deposit Pension Scheme) maximum up to ৳120,000 per year
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Sanchaypatra (Savings Certificate)
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Life Insurance Premiums
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Stock market investments
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
