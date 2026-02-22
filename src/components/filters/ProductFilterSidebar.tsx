"use client";

import { Filter, ChevronDown, CheckSquare } from 'lucide-react';

interface ProductFilterSidebarProps {
    selectedFilters: Record<string, string[]>;
    onFilterChange: (category: string, option: string) => void;
    onClearFilters: () => void;
}

export default function ProductFilterSidebar({ selectedFilters, onFilterChange, onClearFilters }: ProductFilterSidebarProps) {
    const filters = [
        {
            category: "Card Network",
            options: ["Visa", "Mastercard", "American Express"]
        },
        {
            category: "Card Type",
            options: ["Rewards", "Cashback", "Travel & Lounge", "Student"]
        },
        {
            category: "Annual Fee",
            options: ["No Annual Fee", "First Year Free", "Premium (৳ 5000+)"]
        }
    ];

    const isChecked = (category: string, option: string) => {
        return selectedFilters[category]?.includes(option) || false;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Filter className="w-5 h-5 text-brand-blue" />
                <h3 className="font-bold text-lg text-brand-dark">Filters</h3>
            </div>

            <div className="space-y-6">
                {filters.map((filterBlock, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between items-center mb-3 cursor-pointer group">
                            <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wide group-hover:text-brand-blue transition-colors">{filterBlock.category}</h4>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                            {filterBlock.options.map((option, oIdx) => (
                                <label key={oIdx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-brand-blue transition-colors bg-slate-50 relative">
                                        {isChecked(filterBlock.category, option) && <CheckSquare className="w-4 h-4 text-brand-blue absolute inset-0 m-auto" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked(filterBlock.category, option)}
                                        onChange={() => onFilterChange(filterBlock.category, option)}
                                    />
                                    <span className="text-slate-600 group-hover:text-brand-dark text-sm transition-colors">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onClearFilters}
                className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors text-sm"
            >
                Clear All Filters
            </button>
        </div>
    );
}
