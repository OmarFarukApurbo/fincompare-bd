"use client";

import { CreditCard, ArrowRightLeft, TrendingUp, Smartphone, Moon, Receipt } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import Link from 'next/link';

export default function QuickActions() {
    const { t } = useI18n();

    const actions = [
        {
            icon: CreditCard,
            title: t.quick_actions.credit_cards,
            href: '/cards',
            gradient: 'from-blue-500 to-indigo-600',
            glow: 'group-hover:shadow-blue-200',
            ring: 'group-hover:ring-blue-100',
        },
        {
            icon: ArrowRightLeft,
            title: t.quick_actions.personal_loans,
            href: '/loans',
            gradient: 'from-indigo-500 to-violet-600',
            glow: 'group-hover:shadow-indigo-200',
            ring: 'group-hover:ring-indigo-100',
        },
        {
            icon: TrendingUp,
            title: t.quick_actions.dps_return,
            href: '/deposits',
            gradient: 'from-emerald-500 to-teal-600',
            glow: 'group-hover:shadow-emerald-200',
            ring: 'group-hover:ring-emerald-100',
        },
        {
            icon: Smartphone,
            title: t.quick_actions.mfs_charge,
            href: '/mfs',
            gradient: 'from-teal-500 to-cyan-600',
            glow: 'group-hover:shadow-teal-200',
            ring: 'group-hover:ring-teal-100',
        },
        {
            icon: Moon,
            title: t.quick_actions.islamic_finance,
            href: '/islamic',
            gradient: 'from-green-500 to-emerald-700',
            glow: 'group-hover:shadow-green-200',
            ring: 'group-hover:ring-green-100',
        },
        {
            icon: Receipt,
            title: t.quick_actions.tax_rebate,
            href: '/tax',
            gradient: 'from-violet-500 to-purple-600',
            glow: 'group-hover:shadow-violet-200',
            ring: 'group-hover:ring-violet-100',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {actions.map((action, idx) => (
                    <Link
                        key={idx}
                        href={action.href}
                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-200 ring-2 ring-transparent ${action.ring}`}
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-md ${action.glow} group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                            <action.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                        </div>
                        <h3 className="font-semibold text-sm text-brand-dark group-hover:text-brand-blue transition-colors leading-tight">
                            {action.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}
