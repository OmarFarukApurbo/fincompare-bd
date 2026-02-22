"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';

type ProductOption = { label: string; value: string; route: string };
type GoalOption = { label: string; value: string };
type IncomeOption = { label: string; value: string };

const PRODUCTS: ProductOption[] = [
    { label: 'Credit Cards', value: 'credit-cards', route: '/cards' },
    { label: 'Personal Loans', value: 'personal-loans', route: '/loans' },
    { label: 'Home Loans', value: 'home-loans', route: '/loans' },
    { label: 'Auto Loans', value: 'auto-loans', route: '/loans' },
    { label: 'Business Loans', value: 'business-loans', route: '/loans' },
    { label: 'DPS / FDR', value: 'dps-fdr', route: '/deposits' },
    { label: 'Islamic Finance', value: 'islamic', route: '/islamic' },
];

const GOALS_BY_PRODUCT: Record<string, GoalOption[]> = {
    'credit-cards': [
        { label: 'Travel & Lounge', value: 'travel' },
        { label: 'Cashback', value: 'cashback' },
        { label: 'Dining & Lifestyle', value: 'dining' },
        { label: 'Rewards Points', value: 'rewards' },
        { label: 'Student / First Card', value: 'student' },
        { label: 'Zero Annual Fee', value: 'zero-fee' },
    ],
    'personal-loans': [
        { label: 'Lowest Interest Rate', value: 'lowest-rate' },
        { label: 'Quick Approval', value: 'quick' },
        { label: 'Large Amount', value: 'large-amount' },
        { label: 'Minimal Documents', value: 'min-docs' },
    ],
    'home-loans': [
        { label: 'New Property', value: 'new-property' },
        { label: 'Ready Apartment', value: 'ready-apt' },
        { label: 'Long Tenure', value: 'long-tenure' },
        { label: 'Partial Prepayment', value: 'prepayment' },
    ],
    'auto-loans': [
        { label: 'Brand New Car', value: 'new-car' },
        { label: 'Reconditioned', value: 'reconditioned' },
        { label: 'Low Processing Fee', value: 'low-fee' },
        { label: 'Full Financing', value: 'full-finance' },
    ],
    'business-loans': [
        { label: 'Working Capital', value: 'working-capital' },
        { label: 'SME Subsidized', value: 'sme' },
        { label: 'Women Entrepreneur', value: 'women' },
        { label: 'Export / Import', value: 'exim' },
    ],
    'dps-fdr': [
        { label: 'Highest FDR Rate', value: 'fdr' },
        { label: 'DPS Monthly Scheme', value: 'dps-monthly' },
        { label: 'Short Tenure (1 yr)', value: 'short' },
        { label: 'Long Tenure (5 yr+)', value: 'long' },
    ],
    'islamic': [
        { label: 'Mudaraba Savings', value: 'mudaraba' },
        { label: 'Islamic Credit Card', value: 'islamic-card' },
        { label: 'Home Finance', value: 'home-finance' },
        { label: 'SME Finance', value: 'sme-finance' },
    ],
};

const INCOMES: IncomeOption[] = [
    { label: '৳ 15,000 – 25,000', value: '15000' },
    { label: '৳ 25,000 – 40,000', value: '25000' },
    { label: '৳ 40,000 – 75,000', value: '40000' },
    { label: '৳ 75,000 – 1,50,000', value: '75000' },
    { label: '৳ 1,50,000+', value: '150000' },
];

function PortalDropdown({ anchorRef, onClose, children }: {
    anchorRef: React.RefObject<HTMLButtonElement | null>;
    onClose: () => void;
    children: React.ReactNode;
}) {
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const position = () => {
            if (!anchorRef.current) return;
            const rect = anchorRef.current.getBoundingClientRect();
            setStyle({
                position: 'fixed',
                top: rect.bottom + 8,
                left: rect.left,
                width: Math.max(rect.width, 220),
                zIndex: 99999,
            });
        };
        position();
        window.addEventListener('scroll', position, true);
        window.addEventListener('resize', position);
        return () => {
            window.removeEventListener('scroll', position, true);
            window.removeEventListener('resize', position);
        };
    }, [anchorRef]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (anchorRef.current && !anchorRef.current.closest('[data-select-root]')?.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [anchorRef, onClose]);

    if (typeof document === 'undefined') return null;

    return createPortal(
        <div style={style}>
            <div
                onMouseDown={e => e.stopPropagation()}
                className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

function CustomSelect<T extends { label: string; value: string }>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: T[];
    value: string;
    onChange: (val: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const selected = options.find(o => o.value === value);
    const close = useCallback(() => setOpen(false), []);

    return (
        <div className="flex-1 w-full relative" data-select-root>
            <button
                ref={btnRef}
                onClick={() => setOpen(p => !p)}
                className="w-full h-[72px] text-left bg-slate-50 border border-slate-200 rounded-xl px-4 hover:border-brand-blue/40 transition-colors group flex flex-col justify-center"
            >
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <div className="flex items-center justify-between">
                    <span className="text-brand-dark font-bold text-base leading-tight truncate pr-2 group-hover:text-brand-blue transition-colors">
                        {selected?.label ?? '—'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 group-hover:text-brand-blue ${open ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {open && (
                <PortalDropdown anchorRef={btnRef} onClose={close}>
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-slate-50 transition-colors ${opt.value === value ? 'font-bold text-brand-blue bg-brand-blue/5' : 'text-slate-700'}`}
                        >
                            {opt.label}
                            {opt.value === value && <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />}
                        </button>
                    ))}
                </PortalDropdown>
            )}
        </div>
    );
}

export default function HeroSearchWidget() {
    const { t } = useI18n();
    const router = useRouter();

    const [product, setProduct] = useState('credit-cards');
    const [goal, setGoal] = useState('travel');
    const [income, setIncome] = useState('40000');

    const goalOptions = GOALS_BY_PRODUCT[product] ?? GOALS_BY_PRODUCT['credit-cards'];

    const handleProductChange = (val: string) => {
        setProduct(val);
        const newGoals = GOALS_BY_PRODUCT[val] ?? [];
        if (!newGoals.find(g => g.value === goal)) {
            setGoal(newGoals[0]?.value ?? '');
        }
    };

    const handleFindMatches = () => {
        const selected = PRODUCTS.find(p => p.value === product);
        if (selected) router.push(selected.route);
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-stretch gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-white/20">
            <CustomSelect
                label={t.hero.search_prefix}
                options={PRODUCTS}
                value={product}
                onChange={handleProductChange}
            />

            <CustomSelect
                label={t.hero.purpose_prefix}
                options={goalOptions}
                value={goal}
                onChange={setGoal}
            />

            <CustomSelect
                label={t.hero.income_prefix}
                options={INCOMES}
                value={income}
                onChange={setIncome}
            />

            <button
                onClick={handleFindMatches}
                className="w-full md:w-auto h-[72px] bg-brand-green hover:bg-brand-green-dark text-white font-bold text-base px-8 rounded-xl transition-all shadow-lg hover:shadow-xl btn-bounce flex items-center justify-center gap-2 flex-shrink-0"
            >
                <Search className="w-5 h-5 flex-shrink-0" />
                <span>{t.hero.find_matches}</span>
            </button>
        </div>
    );
}
