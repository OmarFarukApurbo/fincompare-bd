"use client";

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

export default function EMICalculator() {
    const { t } = useI18n();
    const [amount, setAmount] = useState<number | string>(1100000);
    const [tenure, setTenure] = useState<number | string>(36);
    const [rate, setRate] = useState<number | string>(9.5);

    const calculateEMI = () => {
        const principal = Number(amount) || 0;
        const ratePerMonth = (Number(rate) || 0) / 12 / 100;
        const tenureMonths = Number(tenure) || 0;

        if (principal === 0 || ratePerMonth === 0 || tenureMonths === 0) return { emi: 0, total: 0, interest: 0 };

        const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) / (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
        const total = emi * tenureMonths;
        const interest = total - principal;

        return {
            emi: emi.toFixed(0),
            total: total.toFixed(0),
            interest: interest.toFixed(0)
        };
    };

    const result = calculateEMI();

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
            <h3 className="font-bold text-2xl text-slate-800 mb-8">{t.calculator.emi_title}</h3>

            <div className="space-y-8">
                {/* Loan Amount */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{t.calculator.loan_amount}</label>
                        <div className="flex items-center font-bold text-[#1e3a8a]">
                            <span className="mr-1 text-slate-400 text-sm font-medium">৳</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={amount !== '' ? Number(amount).toLocaleString() : ''}
                                onChange={handleIntegerChange(setAmount, 100000000)}
                                className="w-32 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 -mr-1"
                            />
                        </div>
                    </div>
                    <input
                        type="range"
                        min="50000"
                        max="100000000"
                        step="50000"
                        value={Number(amount)}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                    />
                </div>

                {/* Tenure */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{t.calculator.tenure_months}</label>
                        <div className="flex items-center font-bold text-[#1e3a8a]">
                            <input
                                type="text"
                                inputMode="numeric"
                                list="tenure-options"
                                value={tenure}
                                onChange={handleIntegerChange(setTenure, 360)}
                                className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none cursor-pointer rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="ml-1 text-[#1e3a8a]">{t.common.months}</span>
                            <datalist id="tenure-options">
                                <option value="3" />
                                <option value="4" />
                                <option value="6" />
                                <option value="12" />
                                <option value="24" />
                                <option value="36" />
                            </datalist>
                        </div>
                    </div>
                    <input
                        type="range"
                        min="3"
                        max="120"
                        step="1"
                        value={Number(tenure)}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                    />
                </div>

                {/* Interest Rate */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{t.calculator.interest_rate}</label>
                        <div className="flex items-center font-bold text-[#1e3a8a]">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={rate}
                                onChange={handleNumberChange(setRate, 30)}
                                className="w-16 text-right bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded transition-colors px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="ml-1 text-[#1e3a8a]">%</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.5"
                        value={Number(rate)}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a] focus:outline-none"
                    />
                </div>
            </div>

            {/* Results Box */}
            <div className="mt-10 p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-slate-500 text-sm font-medium whitespace-nowrap">{t.calculator.monthly_emi}</div>
                    <div className="flex items-baseline text-emerald-600 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-extrabold tabular-nums" style={{ fontSize: 'clamp(0.95rem, 3.5cqw, 1.75rem)', lineHeight: 1.2 }}>{Number(result.emi).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="text-slate-500 text-sm font-medium whitespace-nowrap">{t.calculator.total_interest}</div>
                    <div className="flex items-baseline text-slate-800 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-bold tabular-nums" style={{ fontSize: 'clamp(0.95rem, 3.5cqw, 1.5rem)', lineHeight: 1.2 }}>{Number(result.interest).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
                    <div className="text-slate-700 text-sm font-bold whitespace-nowrap">{t.calculator.total_payable}</div>
                    <div className="flex items-baseline text-slate-900 gap-1 justify-end">
                        <span className="text-base font-medium flex-shrink-0">৳</span>
                        <span className="font-extrabold tabular-nums" style={{ fontSize: 'clamp(1rem, 3.8cqw, 1.375rem)', lineHeight: 1.2 }}>{Number(result.total).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
