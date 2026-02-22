"use client";

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Info } from 'lucide-react';

// ─── MFS Fee Data ────────────────────────────────────────────────────────────

const MFS_PROVIDERS = {
    bkash: {
        name: 'bKash',
        color: 'from-pink-500 to-rose-600',
        fees: {
            send: { rate: 0, fixed: 0, note: 'Free' },
            cashout: { rate: 0.0185, fixed: 0, note: '1.85% of amount' },
            addmoney: { rate: 0, fixed: 0, note: 'Free' },
            payment: { rate: 0, fixed: 0, note: 'Free' },
        },
    },
    nagad: {
        name: 'Nagad',
        color: 'from-orange-500 to-amber-600',
        fees: {
            send: { rate: 0, fixed: 0, note: 'Free' },
            cashout: { rate: 0.0099, fixed: 0, note: '0.99% of amount' },
            addmoney: { rate: 0, fixed: 0, note: 'Free' },
            payment: { rate: 0, fixed: 0, note: 'Free' },
        },
    },
    rocket: {
        name: 'Rocket (DBBL)',
        color: 'from-violet-500 to-purple-600',
        fees: {
            send: { rate: 0.015, fixed: 0, note: '1.5% of amount' },
            cashout: { rate: 0.0185, fixed: 0, note: '1.85% of amount' },
            addmoney: { rate: 0, fixed: 0, note: 'Free' },
            payment: { rate: 0, fixed: 0, note: 'Free' },
        },
    },
    upay: {
        name: 'Upay',
        color: 'from-teal-500 to-cyan-600',
        fees: {
            send: { rate: 0, fixed: 0, note: 'Free' },
            cashout: { rate: 0.018, fixed: 0, note: '1.8% of amount' },
            addmoney: { rate: 0, fixed: 0, note: 'Free' },
            payment: { rate: 0, fixed: 0, note: 'Free' },
        },
    },
};

type ProviderId = keyof typeof MFS_PROVIDERS;
type TransactionType = 'send' | 'cashout' | 'addmoney' | 'payment';

const TRANSACTION_LABELS: Record<TransactionType, string> = {
    send: 'Send Money',
    cashout: 'Cash Out',
    addmoney: 'Add Money',
    payment: 'Merchant Payment',
};

function formatBDT(n: number) {
    return '৳' + Math.round(n).toLocaleString('en-IN');
}

export default function MFSCalculatorPage() {
    const [provider, setProvider] = useState<ProviderId>('bkash');
    const [txType, setTxType] = useState<TransactionType>('cashout');
    const [amount, setAmount] = useState('');

    const data = MFS_PROVIDERS[provider];
    const feeInfo = data.fees[txType];
    const amt = parseFloat(amount.replace(/,/g, '')) || 0;
    const fee = amt * feeInfo.rate + feeInfo.fixed;
    const net = txType === 'cashout' ? amt - fee : amt + fee;

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white pb-20">
            <Navbar />

            <PageHeader
                title="MFS Charge Calculator"
                description="Calculate exact fees for bKash, Nagad, Rocket & Upay transactions instantly."
                breadcrumbs={[{ label: 'MFS Calculator' }]}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-14 relative z-20">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
                    <div className="space-y-8">
                        {/* Provider Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Select Provider</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(Object.entries(MFS_PROVIDERS) as [ProviderId, typeof MFS_PROVIDERS.bkash][]).map(([id, p]) => (
                                    <button
                                        key={id}
                                        onClick={() => setProvider(id)}
                                        className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${provider === id
                                            ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Type */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Transaction Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(Object.entries(TRANSACTION_LABELS) as [TransactionType, string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setTxType(key)}
                                        className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${txType === key
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (BDT)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">৳</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    placeholder="0"
                                    min={0}
                                    className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-slate-200 rounded-2xl focus:border-brand-blue focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Result */}
                        {amt > 0 && (
                            <div className={`rounded-2xl p-6 bg-gradient-to-br ${data.color} text-white shadow-lg`}>
                                <p className="text-sm font-medium opacity-80 mb-1">Fee charged by {data.name}</p>
                                <p className="text-4xl font-extrabold mb-4">{formatBDT(fee)}</p>
                                <div className="grid grid-cols-2 gap-4 mt-2 border-t border-white/20 pt-4">
                                    <div>
                                        <p className="text-xs opacity-70 mb-1">You send / enter</p>
                                        <p className="text-xl font-bold">{formatBDT(amt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs opacity-70 mb-1">{txType === 'cashout' ? 'You receive' : 'Total deducted'}</p>
                                        <p className="text-xl font-bold">{formatBDT(net)}</p>
                                    </div>
                                </div>
                                <p className="text-xs opacity-60 mt-4 flex items-center gap-1">
                                    <Info className="w-3 h-3" /> Rate: {feeInfo.note}
                                </p>
                            </div>
                        )}

                        {/* Fee Reference Table */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">All Provider Fees — {TRANSACTION_LABELS[txType]}</h3>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-600">Provider</th>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-600">Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(Object.entries(MFS_PROVIDERS) as [ProviderId, typeof MFS_PROVIDERS.bkash][]).map(([id, p]) => (
                                            <tr key={id} className={`border-t border-slate-100 ${id === provider ? 'bg-brand-blue/5' : ''}`}>
                                                <td className="px-4 py-3 font-medium text-slate-700">{p.name}</td>
                                                <td className="px-4 py-3 text-slate-600">{p.fees[txType].note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <Info className="w-3 h-3" /> Fees are indicative and subject to change. Verify with provider before transacting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
