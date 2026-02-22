"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from "lucide-react";
import { useI18n } from '@/context/I18nContext';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useI18n();

    return (
        <footer className="bg-brand-dark pt-16 pb-8 text-slate-300 font-sans border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 border-b border-slate-800 pb-12">
                    {/* Brand & Info */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 text-white mb-4">
                            <div className="bg-brand-blue p-1.5 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl tracking-tight">FinCompare <span className="text-brand-green">BD</span></span>
                        </Link>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            {t.footer.desc}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.products}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/cards" className="hover:text-brand-green transition-colors">{t.navbar.credit_cards}</Link></li>
                            <li><Link href="/loans" className="hover:text-brand-green transition-colors">{t.footer.personal_loans}</Link></li>
                            <li><Link href="/loans" className="hover:text-brand-green transition-colors">{t.footer.home_loans}</Link></li>
                            <li><Link href="/deposits" className="hover:text-brand-green transition-colors">{t.navbar.dps_fdr}</Link></li>
                            <li><Link href="/islamic" className="hover:text-brand-green transition-colors">{t.navbar.islamic_finance}</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.resources}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/blog" className="hover:text-brand-green transition-colors">{t.footer.blog}</Link></li>
                            <li><Link href="/loans" className="hover:text-brand-green transition-colors">{t.footer.emi_calc}</Link></li>
                            <li><Link href="/deposits" className="hover:text-brand-green transition-colors">{t.footer.return_calc}</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">{t.footer.tax_guide}</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.company}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-brand-green transition-colors">{t.footer.about_us}</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-green transition-colors">{t.footer.contact}</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">{t.footer.careers}</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">{t.footer.privacy}</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">{t.footer.terms}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
                    <p>© {currentYear} FinCompare BD. {t.footer.rights}</p>
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-brand-green" />
                        <span>{t.footer.unbiased}</span>
                    </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-600 leading-relaxed max-w-4xl mx-auto">
                    {t.footer.disclaimer}
                </div>
            </div>
        </footer>
    );
}
