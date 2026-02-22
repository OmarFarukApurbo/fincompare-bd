"use client";

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

export default function ReturnCalculator() {
    const { t } = useI18n();
    const [mode, setMode] = useState<'DPS' | 'FDR'>('DPS');

    // DPS specific state
    const [monthlyDeposit, setMonthlyDeposit] = useState<number | string>(5000);
    const [dpsTenure, setDpsTenure] = useState<number | string>(5);
    const [dpsRate, setDpsRate] = useState<number | string>(8.5);

    // FDR specific state
    const [initialDeposit, setInitialDeposit] = useState<number | string>(100000);
    const [fdrTenure, setFdrTenure] = useState<number | string>(5);
    const [fdrRate, setFdrRate] = useState<number | string>(9.0);

    const calculateDPS = () => {
        const p = Number(monthlyDeposit) || 0;
        const n = Number(dpsTenure) || 0;
        const r = Number(dpsRate) || 0;

        const totalMonths = n * 12;
        const rMonthly = r / 100 / 12;

        const totalPrincipal = p * totalMonths;
        const totalInterest = p * totalMonths * (totalMonths + 1) / 2 * rMonthly;
        const maturityValue = totalPrincipal + totalInterest;

        return {
            principal: totalPrincipal.toFixed(0),
            interest: totalInterest.toFixed(0),
            maturity: maturityValue.toFixed(0)
        };
    };

    const calculateFDR = () => {
        const p = Number(initialDeposit) || 0;
        const n = Number(fdrTenure) || 0;
        const r = Number(fdrRate) || 0;

        const totalPrincipal = p;
        const totalInterest = p * (r / 100) * n;
        const maturityValue = totalPrincipal + totalInterest;

        return {
            principal: totalPrincipal.toFixed(0),
            interest: totalInterest.toFixed(0),
            maturity: maturityValue.toFixed(0)
        };
    };

    const result = mode === 'DPS' ? calculateDPS() : calculateFDR();

    const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number | string>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        if (val === '') {
            setter('');
        } else {
            let num = Number(val);
            if (!isNaN(num) && num > max) {
                num = max;
                val = max.toString();
            }
            setter(val.includes('.') && val.endsWith('.') ? val : num);
        }
    };

    const handleIntegerChange = (setter: React.Dispatch<React.SetStateAction<number | string>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        if (val === '') {
            setter('');
        } else {
            const num = Number(val);
            setter(num > max ? max : num);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 font-sans">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-2xl text-slate-800">Return Calculator</h3>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setMode('DPS')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${mode === 'DPS' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        DPS
                    </button>
                    <button
                        onClick={() => setMode('FDR')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${mode === 'FDR' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        FDR
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {mode === 'DPS' ? (
                    <>
                        {/* Monthly Deposit */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Monthly Deposit</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <span className="mr-1 text-slate-400 text-sm font-medium">৳</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={monthlyDeposit !== '' ? Number(monthlyDeposit).toLocaleString() : ''}
                                        onChange={handleIntegerChange(setMonthlyDeposit, 100000)}
                                        className="w-32 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 -mr-1"
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="100000"
                                step="500"
                                value={Number(monthlyDeposit) || 0}
                                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>

                        {/* Tenure */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Tenure (Years)</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={dpsTenure}
                                        onChange={handleIntegerChange(setDpsTenure, 20)}
                                        className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none cursor-pointer rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="ml-1 text-[#1e3a8a]">Years</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="1"
                                value={Number(dpsTenure) || 0}
                                onChange={(e) => setDpsTenure(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Interest Rate (%)</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={dpsRate}
                                        onChange={handleNumberChange(setDpsRate, 15)}
                                        className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="ml-1 text-[#1e3a8a]">%</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="3"
                                max="15"
                                step="0.25"
                                value={Number(dpsRate) || 0}
                                onChange={(e) => setDpsRate(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Initial Deposit */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Initial Deposit</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <span className="mr-1 text-slate-400 text-sm font-medium">৳</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={initialDeposit !== '' ? Number(initialDeposit).toLocaleString() : ''}
                                        onChange={handleIntegerChange(setInitialDeposit, 100000000)}
                                        className="w-32 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 -mr-1"
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="10000"
                                max="100000000"
                                step="10000"
                                value={Number(initialDeposit) || 0}
                                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>

                        {/* Tenure */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Tenure (Years)</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={fdrTenure}
                                        onChange={handleIntegerChange(setFdrTenure, 20)}
                                        className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none cursor-pointer rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="ml-1 text-[#1e3a8a]">Years</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="1"
                                value={Number(fdrTenure) || 0}
                                onChange={(e) => setFdrTenure(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Interest Rate (%)</label>
                                <div className="flex items-center font-bold text-[#1e3a8a]">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={fdrRate}
                                        onChange={handleNumberChange(setFdrRate, 15)}
                                        className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="ml-1 text-[#1e3a8a]">%</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="3"
                                max="15"
                                step="0.25"
                                value={Number(fdrRate) || 0}
                                onChange={(e) => setFdrRate(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Results Box */}
            <div className="mt-10 p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-slate-500 text-sm font-medium whitespace-nowrap">Total Deposit</div>
                    <div className="flex items-baseline text-slate-800 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-extrabold tabular-nums" style={{ fontSize: 'clamp(0.95rem, 3.5cqw, 1.5rem)', lineHeight: 1.2 }}>{Number(result.principal).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="text-slate-500 text-sm font-medium whitespace-nowrap">Est. Profit</div>
                    <div className="flex items-baseline text-emerald-600 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-bold tabular-nums" style={{ fontSize: 'clamp(0.95rem, 3.5cqw, 1.5rem)', lineHeight: 1.2 }}>{Number(result.interest).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
                    <div className="text-slate-700 text-sm font-bold whitespace-nowrap">Maturity Amount</div>
                    <div className="flex items-baseline text-slate-900 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-extrabold tabular-nums" style={{ fontSize: 'clamp(1rem, 3.8cqw, 1.75rem)', lineHeight: 1.2 }}>{Number(result.maturity).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
