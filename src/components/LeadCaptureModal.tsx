"use client";

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function LeadCaptureModal({ isOpen, onClose, productName }: LeadCaptureModalProps) {
    const { t } = useI18n();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        monthlyIncome: '',
        companyName: '',
        designation: '',
        tenure: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here we will eventually POST to /api/leads using Supabase
        console.log("Submitting lead to backend:", { productName, ...formData });

        setStatus('success');
        setTimeout(() => {
            onClose();
            setStatus('idle');
            setFormData({
                name: '',
                phone: '',
                email: '',
                monthlyIncome: '',
                companyName: '',
                designation: '',
                tenure: ''
            });
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm px-4 py-8 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in zoom-in-95 duration-200 my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.lead_modal.application_received}</h3>
                            <p className="text-slate-500">{t.lead_modal.contact_shortly} <span className="font-semibold text-brand-blue">{productName}</span>.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-brand-dark mb-2 pr-8">{t.lead_modal.express_interest}</h3>
                            <p className="text-slate-500 mb-6 text-sm">{t.lead_modal.leave_details} <span className="font-semibold text-brand-blue">{productName}</span>.</p>

                            <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

                                {/* Personal Information Section */}
                                <div className="space-y-4 pb-4 border-b border-slate-100">
                                    <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider">{t.lead_modal.personal_details}</h4>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.full_name}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.phone}</label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-500 sm:text-sm">
                                                    +880
                                                </span>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                                    placeholder="17XXXXXXXX"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.email}</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Information Section */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider">{t.lead_modal.professional_info}</h4>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.monthly_income}</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                            placeholder="50000"
                                            value={formData.monthlyIncome}
                                            onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.company_name}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                            placeholder="Acme Corp Ltd."
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.designation}</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                                placeholder="Manager"
                                                value={formData.designation}
                                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.tenure}</label>
                                            <input
                                                type="number"
                                                required
                                                step="0.1"
                                                min="0"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                                placeholder="e.g. 2.5"
                                                value={formData.tenure}
                                                onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 sticky bottom-0 bg-white border-t border-slate-50 mt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center shadow-md"
                                    >
                                        {status === 'submitting' ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        ) : (
                                            t.lead_modal.submit
                                        )}
                                    </button>
                                    <p className="text-xs text-center text-slate-400 mt-3">{t.lead_modal.agree}</p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
