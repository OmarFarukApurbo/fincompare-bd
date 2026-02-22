import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
    title: string;
    description: string;
    breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
    return (
        <div className="bg-brand-dark pt-12 pb-24 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue blur-3xl"></div>
                <div className="absolute bottom-0 left-20 w-72 h-72 rounded-full bg-brand-green blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6 w-full overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                        <Home className="w-4 h-4" /> Home
                    </Link>
                    {breadcrumbs.map((bc, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                            {bc.href ? (
                                <Link href={bc.href} className="hover:text-white transition-colors">
                                    {bc.label}
                                </Link>
                            ) : (
                                <span className="text-white font-medium">{bc.label}</span>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Title & Description */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{title}</h1>
                    <p className="text-lg text-slate-300">{description}</p>
                </div>
            </div>
        </div>
    );
}
