"use client";

import { useState, useEffect } from 'react';
import { Check, Star, Info, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import LeadCaptureModal from './LeadCaptureModal';
import { getDeposits } from '@/lib/api';

interface DPSFDRComparisonTableProps {
    hideHeader?: boolean;
    hideViewAll?: boolean;
    transparentBg?: boolean;
    condensed?: boolean;
}

export default function DPSFDRComparisonTable({ hideHeader = false, hideViewAll = false, transparentBg = false, condensed = false }: DPSFDRComparisonTableProps) {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                const data = await getDeposits();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className={`${condensed ? 'py-0' : 'py-24'} ${transparentBg ? '' : 'bg-white'}`}>
            <div className={`${condensed ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
                {/* Section Header */}
                {!hideHeader && (
                    <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-sm mb-4 border border-brand-blue/20">
                                <ShieldCheck className="w-4 h-4" /> 100% Unbiased Data
                            </div>
                            <h2 className="text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
                                Top DPS & FDR Products This Month
                            </h2>
                            <p className="text-xl text-slate-500 max-w-2xl">
                                Compare rates, features, and benefits to maximize your savings growth.
                            </p>
                        </div>
                        {!hideViewAll && (
                            <div>
                                <button className="text-brand-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                    View all 30+ Deposits <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Comparison Grid */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center font-semibold text-slate-500 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                        Fetching latest deposits...
                    </div>
                ) : (
                    <div className={`grid gap-8 ${condensed ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                        {products.map((product) => (
                            <div key={product.id} className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                                {/* Popular Badge */}
                                {product.isPopular && (
                                    <div className="absolute top-0 right-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-md z-10">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Card Header & Visual */}
                                <div className="p-6 pb-0 relative">
                                    <div className={`w-full aspect-[1.586/1] rounded-2xl ${product.image_url ? 'bg-transparent' : `bg-gradient-to-br ${product.color} shadow-lg`} relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500`}>
                                        {product.image_url ? (
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                                unoptimized // Supabase storage URLs
                                            />
                                        ) : (
                                            <>
                                                {/* Abstract Card Details */}
                                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                                <div className="absolute top-4 left-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-xl">
                                                        {product.bank.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                    <div>
                                                        <div className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">{product.bank}</div>
                                                        <div className="text-white font-bold text-lg">{product.name}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Card Content body */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-6">
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${product.badgeColor}`}>
                                            {product.highlight}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{product.bank}</h3>
                                        <div className="flex items-center gap-1 text-sm text-slate-500">
                                            <div className="flex items-center text-amber-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="font-bold text-slate-700 ml-1">{product.rating}</span>
                                            </div>
                                            <span>({product.reviews} Reviews)</span>
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div className="space-y-3 mb-8 flex-grow">
                                        {product.features?.map((feature: string, i: number) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Metrics container */}
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 mb-8">
                                        <div>
                                            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                Min. Deposit <Info className="w-3 h-3" />
                                            </div>
                                            <div className="font-bold text-slate-900">{product.minDeposit}</div>
                                            <div className="text-xs text-emerald-600 font-medium">{product.tenure}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                                                Interest Rate <Info className="w-3 h-3" />
                                            </div>
                                            <div className="font-bold text-slate-900">{product.interestRate}</div>
                                        </div>
                                    </div>

                                    {/* Call to action */}
                                    <button
                                        onClick={() => setSelectedProduct(`${product.bank} ${product.name}`)}
                                        className="w-full py-4 rounded-xl font-bold text-lg bg-slate-50 text-brand-dark border-2 border-slate-200 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <LeadCaptureModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct || ''}
            />
        </div>
    );
}
