"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from '@/context/I18nContext';

export default function ContactPage() {
    const { t } = useI18n();

    return (
        <div className="font-sans selection:bg-brand-blue selection:text-white pb-20">
            <Navbar />

            <PageHeader
                title={t.pages.contact.title}
                description={t.pages.contact.desc}
                breadcrumbs={[{ label: t.pages.contact.title }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
                <main className="w-full">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 lg:p-12">
                        <div className="grid md:grid-cols-2 gap-16">

                            {/* Contact Information */}
                            <div>
                                <h2 className="text-3xl font-bold text-brand-dark mb-6">{t.pages.contact.get_in_touch}</h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                                    Whether you need clarity on a specific credit card, help calculating your EMI, or want to partner with us, our team is ready to assist you.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-dark mb-1">{t.pages.contact.email_support}</h4>
                                            <p className="text-slate-500 mb-1">For general inquiries and partnerships.</p>
                                            <a href="mailto:hello@fincompare.com.bd" className="text-brand-blue font-semibold hover:underline">hello@fincompare.com.bd</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-dark mb-1">{t.pages.contact.call_us}</h4>
                                            <p className="text-slate-500 mb-1">Mon-Fri from 9am to 6pm BD Time.</p>
                                            <a href="tel:+8801900000000" className="text-brand-dark font-semibold hover:text-brand-blue">+880 1900 000 000</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-dark mb-1">{t.pages.contact.office_location}</h4>
                                            <p className="text-slate-500">
                                                Level 4, FinTower<br />
                                                Gulshan Avenue, Dhaka-1212<br />
                                                Bangladesh
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <h3 className="text-2xl font-bold text-brand-dark mb-6">{t.pages.contact.send_message}</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.full_name}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">{t.lead_modal.email}</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white resize-none"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full mt-2 bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
                                    >
                                        {t.pages.contact.submit_msg}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
