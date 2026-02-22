"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, ChevronDown, Globe, User, Menu, X, CreditCard, Landmark, PiggyBank, Star, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';

export default function Navbar() {
    const { t, language, setLanguage } = useI18n();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: t.navbar.credit_cards, href: '/cards', icon: CreditCard },
        { label: t.navbar.loans, href: '/loans', icon: Landmark },
        { label: t.navbar.dps_fdr, href: '/deposits', icon: PiggyBank },
        { label: t.navbar.islamic_finance, href: '/islamic', icon: Star },
        { label: t.navbar.tax_tools, href: '/tax', icon: Calculator },
    ];

    // Lock body scroll when menu is open — prevents scroll while drawer is visible
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const close = () => setIsMobileMenuOpen(false);

    return (
        <>
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                            <div className="bg-brand-blue text-white p-2 rounded-lg group-hover:bg-brand-blue-light transition-colors">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl text-brand-dark tracking-tight">
                                Fin<span className="text-brand-green">Compare</span> BD
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-gray-600 font-medium hover:text-brand-blue px-3 py-2 rounded-md transition-colors flex items-center gap-1 hover:bg-slate-50"
                                >
                                    {item.label} <ChevronDown className="w-4 h-4 opacity-50" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-6">
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                            >
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span className={`text-sm font-semibold transition-colors ${language === 'en' ? 'text-brand-blue' : 'text-gray-400'}`}>ENG</span>
                                <div className="relative inline-block w-8 align-middle select-none">
                                    <div className={`w-8 h-4 rounded-full shadow-inner transition-colors ${language === 'bn' ? 'bg-brand-green' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute w-4 h-4 rounded-full shadow bg-white border border-gray-200 top-0 transition-transform duration-200 ${language === 'bn' ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <span className={`text-sm font-semibold transition-colors ${language === 'bn' ? 'text-brand-green' : 'text-gray-400'}`}>বাংলা</span>
                            </div>

                            <button className="flex items-center gap-2 text-brand-blue font-semibold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                                <User className="w-4 h-4" /> {t.navbar.sign_in}
                            </button>
                        </div>

                        {/* Mobile Hamburger */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                                aria-label="Toggle navigation"
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-brand-blue hover:bg-slate-100 transition-all focus:outline-none"
                            >
                                <span className={`transition-transform duration-300 block ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/*
             * Mobile Menu — fixed overlay, NOT in document flow.
             * This means opening/closing causes zero layout reflow,
             * eliminating all scroll stutter completely.
             * Backdrop click dismisses the menu.
             * translateY animation is GPU-accelerated (smooth on all devices).
             */}
            <div
                className={`md:hidden fixed inset-0 top-[80px] z-40 transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={close}
                />

                {/* Menu Panel — slides down from top */}
                <div
                    className={`absolute top-0 left-0 right-0 bg-white shadow-2xl rounded-b-3xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                        }`}
                >
                    <div className="px-4 pt-3 pb-6 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={close}
                                    className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:text-brand-blue transition-all group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-brand-blue/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-brand-blue transition-colors" />
                                    </div>
                                    <span className="flex-1">{item.label}</span>
                                    <ChevronDown className="w-4 h-4 opacity-30 -rotate-90 flex-shrink-0" />
                                </Link>
                            );
                        })}

                        {/* Language + Sign In */}
                        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between px-1">
                            <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                            >
                                <Globe className="w-5 h-5 text-gray-500" />
                                <span className="text-sm font-bold text-gray-700">
                                    {language === 'en' ? 'ENG / BN' : 'ENG / বাংলা'}
                                </span>
                            </div>
                            <button className="bg-brand-blue text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                                <User className="w-4 h-4" />
                                {t.navbar.sign_in}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
