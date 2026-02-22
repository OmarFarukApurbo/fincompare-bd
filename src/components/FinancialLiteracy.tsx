import { ArrowRight } from 'lucide-react';

export default function FinancialLiteracy() {
    const articles = [
        { tag: 'Tax Strategy', title: 'How to claim your NBR tax rebate effectively in 2026', readTime: '5 min read' },
        { tag: 'Islamic Finance', title: 'Understanding Mudaraba vs. Traditional FDR', readTime: '8 min read' },
        { tag: 'Credit Bureau', title: '5 Actionable Tips to Improve Your CIB Score', readTime: '4 min read' },
    ];

    return (
        <div className="bg-white py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-brand-dark tracking-tight">Level Up Your Finances</h2>
                        <p className="text-gray-500 mt-2 text-lg">Expert guides and localized insights for Bangladesh.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="h-48 bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${idx === 0 ? 'from-blue-400 to-indigo-500' : idx === 1 ? 'from-emerald-400 to-teal-500' : 'from-violet-400 to-purple-500'} opacity-80 group-hover:scale-105 transition-transform duration-700`}></div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                    {article.tag}
                                </div>
                            </div>
                            <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-blue transition-colors mb-2 leading-snug">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium flex justify-between items-center">
                                {article.readTime}
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-blue" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
