"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, X } from 'lucide-react';
import Image from 'next/image';

interface Props {
    allCards: any[];
    currentIds: number[];
    isFullWidth?: boolean;
}

export default function CompareCardSelector({ allCards, currentIds, isFullWidth = false }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const router = useRouter();

    const availableCards = allCards.filter(c => !currentIds.includes(c.id));
    const filteredCards = availableCards.filter(c =>
        (c.name + ' ' + c.bank).toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (cardId: number) => {
        const newIds = [...currentIds, cardId].join(',');
        router.push(`/cards/compare?ids=${newIds}`);
        setIsOpen(false);
    };

    if (!isOpen) {
        if (isFullWidth) {
            return (
                <button onClick={() => setIsOpen(true)} className="inline-block bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                    Add Credit Card to Compare
                </button>
            );
        }

        return (
            <button onClick={() => setIsOpen(true)} className="w-full h-full min-h-[250px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-brand-blue/30 transition-all group relative bg-transparent cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-brand-blue" />
                </div>
                <span className="text-sm font-semibold group-hover:text-brand-blue">Add Card</span>
            </button>
        );
    }

    return (
        <div className={`relative ${isFullWidth ? 'max-w-md mx-auto' : 'w-full h-full min-h-[250px]'}`}>
            <div className={`bg-white border text-left border-brand-blue shadow-xl rounded-2xl overflow-hidden flex flex-col ${isFullWidth ? 'h-[400px]' : 'absolute inset-0 z-20'}`}>
                <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h4 className="font-bold text-sm text-slate-800">Select a Card</h4>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="p-3 border-b border-slate-100">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search bank or card..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar min-h-0 bg-white">
                    {filteredCards.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-500 font-medium">No cards found.</div>
                    ) : (
                        filteredCards.map(card => (
                            <button
                                key={card.id}
                                onClick={() => handleSelect(card.id)}
                                className="w-full text-left p-2 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group cursor-pointer"
                            >
                                <div className="w-12 h-8 relative bg-white border border-slate-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {card.image_url ? (
                                        <Image src={card.image_url} alt={card.name} fill className="object-contain p-1" unoptimized />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${card.color}`}></div>
                                    )}
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{card.bank}</div>
                                    <div className="text-sm font-semibold text-slate-700 truncate group-hover:text-brand-blue transition-colors">{card.name}</div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
