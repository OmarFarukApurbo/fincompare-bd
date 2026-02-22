"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CreditCard, Banknote, Building, Landmark, Loader2, Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

type TabType = 'credit_cards' | 'loans' | 'deposits' | 'shariah_cards';

const schemas: Record<TabType, { key: string, label: string, type: 'text' | 'number' | 'boolean' | 'textarea' }[]> = {
    credit_cards: [
        { key: 'bank', label: 'Bank Name', type: 'text' },
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'highlight', label: 'Highlight Badge Text', type: 'text' },
        { key: 'rating', label: 'Rating (0-5)', type: 'number' },
        { key: 'reviews', label: 'Number of Reviews', type: 'number' },
        { key: 'annual_fee', label: 'Annual Fee', type: 'text' },
        { key: 'fee_waived_condition', label: 'Fee Waived Condition', type: 'text' },
        { key: 'interest_rate', label: 'Interest Rate', type: 'text' },
        { key: 'color', label: 'Card Color Style (e.g., from-blue-600 to-indigo-800)', type: 'text' },
        { key: 'badge_color', label: 'Badge Style (e.g., bg-blue-100 text-blue-700)', type: 'text' },
        { key: 'is_popular', label: 'Is Popular Badge?', type: 'boolean' },
        { key: 'features', label: 'Key Features (One per line)', type: 'textarea' },
        { key: 'documents', label: 'Required Documents (One per line)', type: 'textarea' },
        { key: 'eligibility', label: 'Eligibility Criteria (One per line)', type: 'textarea' },
    ],
    loans: [
        { key: 'category', label: 'Category (Personal Loan, Home Loan, Auto Loan, Business Loan)', type: 'text' },
        { key: 'bank', label: 'Bank Name', type: 'text' },
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'highlight', label: 'Highlight Text', type: 'text' },
        { key: 'rating', label: 'Rating (0-5)', type: 'number' },
        { key: 'reviews', label: 'Number of Reviews', type: 'number' },
        { key: 'processing_fee', label: 'Processing Fee', type: 'text' },
        { key: 'fee_details', label: 'Fee Details', type: 'text' },
        { key: 'interest_rate', label: 'Interest Rate', type: 'text' },
        { key: 'color', label: 'Card Color Style', type: 'text' },
        { key: 'badge_color', label: 'Badge Style', type: 'text' },
        { key: 'is_popular', label: 'Is Popular Badge?', type: 'boolean' },
        { key: 'features', label: 'Key Features (One per line)', type: 'textarea' },
        { key: 'documents', label: 'Required Documents (One per line)', type: 'textarea' },
        { key: 'eligibility', label: 'Eligibility Criteria (One per line)', type: 'textarea' },
    ],
    deposits: [
        { key: 'bank', label: 'Bank Name', type: 'text' },
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'highlight', label: 'Highlight Text', type: 'text' },
        { key: 'rating', label: 'Rating (0-5)', type: 'number' },
        { key: 'reviews', label: 'Number of Reviews', type: 'number' },
        { key: 'min_deposit', label: 'Minimum Deposit', type: 'text' },
        { key: 'tenure', label: 'Tenure', type: 'text' },
        { key: 'interest_rate', label: 'Interest Rate', type: 'text' },
        { key: 'color', label: 'Card Color Style', type: 'text' },
        { key: 'badge_color', label: 'Badge Style', type: 'text' },
        { key: 'is_popular', label: 'Is Popular Badge?', type: 'boolean' },
        { key: 'features', label: 'Key Features (One per line)', type: 'textarea' },
    ],
    shariah_cards: [
        { key: 'bank', label: 'Bank Name', type: 'text' },
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'type', label: 'Card Structure Type (e.g., Ujrah)', type: 'text' },
        { key: 'rating', label: 'Rating (0-5)', type: 'number' },
        { key: 'reviews', label: 'Number of Reviews', type: 'number' },
        { key: 'annual_fee', label: 'Annual Fee', type: 'text' },
        { key: 'features', label: 'Key Features (One per line)', type: 'textarea' },
    ]
};

export default function DashboardHub() {
    const [activeTab, setActiveTab] = useState<TabType>('credit_cards');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Editor State
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (table: TabType) => {
        setIsLoading(true);
        const { data: result, error } = await supabase.from(table).select('*').order('id', { ascending: true });
        if (error) console.error(error);
        else setData(result || []);
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this specific product?')) return;
        
        setIsLoading(true);
        await supabase.from(activeTab).delete().eq('id', id);
        fetchData(activeTab);
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || event.target.files.length === 0) return;
            const file = event.target.files[0];
            
            setUploadingImage(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload the file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('product_images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get the Public URL
            const { data: urlData } = supabase.storage
                .from('product_images')
                .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl;

            // Update the form state with the new URL
            setEditingItem({ ...editingItem, image_url: publicUrl });
            
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleFieldChange = (key: string, value: any, type: string) => {
        let parsedValue = value;
        if (type === 'textarea') {
            parsedValue = value.split('\n').filter((s: string) => s.trim() !== '');
        } else if (type === 'number') {
            parsedValue = Number(value);
        }
        setEditingItem({ ...editingItem, [key]: parsedValue });
    };

    const getFieldValue = (key: string, type: string) => {
        if (!editingItem) return '';
        const value = editingItem[key];
        if (type === 'textarea') {
            return Array.isArray(value) ? value.join('\n') : (value || '');
        }
        return value || '';
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            // Remove the id from the payload if creating new, else we update
            let payload = { ...editingItem };
            const isNew = !payload.id;
            if (isNew) delete payload.id;

            if (isNew) {
                const { error } = await supabase.from(activeTab).insert([payload]);
                if (error) throw error;
            } else {
                const { error } = await supabase.from(activeTab).update(payload).eq('id', payload.id);
                if (error) throw error;
            }
            
            setEditingItem(null);
            fetchData(activeTab);
        } catch (error: any) {
            alert('Error saving data: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'credit_cards', icon: CreditCard, label: 'Credit Cards' },
        { id: 'loans', icon: Banknote, label: 'Loans' },
        { id: 'deposits', icon: Building, label: 'DPS/FDR' },
        { id: 'shariah_cards', icon: Landmark, label: 'Islamic' }
    ];

    if (editingItem) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">{editingItem.id ? 'Edit' : 'Add New'} {activeTab.replace('_', ' ')}</h2>
                    <button onClick={() => setEditingItem(null)} className="text-slate-500 hover:text-slate-800 font-semibold">Cancel</button>
                </div>
                
                <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                    {/* Image Upload Area */}
                    <div className="border border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50">
                        <label className="block text-sm font-semibold text-slate-700 mb-4">Product Image</label>
                        <div className="flex gap-6 items-center">
                            <div className="w-48 h-32 bg-white border border-slate-200 rounded-xl relative shadow-sm overflow-hidden flex items-center justify-center">
                                {editingItem.image_url ? (
                                    <Image src={editingItem.image_url} alt="Uploaded" fill className="object-cover" unoptimized />
                                ) : (
                                    <ImageIcon className="text-slate-300 w-8 h-8" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-2">Upload a high-quality product image. The image will automatically cover the product visualization frame.</p>
                                <label className="bg-white border border-slate-200 text-sm font-bold px-4 py-2 flex items-center justify-center gap-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors w-max">
                                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Choose Image'}
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        className="hidden" 
                                        disabled={uploadingImage}
                                        onChange={handleImageUpload} 
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {schemas[activeTab].map((field) => (
                            <div key={field.key} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        rows={4}
                                        value={getFieldValue(field.key, field.type)}
                                        onChange={(e) => handleFieldChange(field.key, e.target.value, field.type)}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2"
                                        placeholder="Enter each item on a new line..."
                                    />
                                ) : field.type === 'boolean' ? (
                                    <div className="flex items-center h-10">
                                        <input
                                            type="checkbox"
                                            checked={editingItem[field.key] || false}
                                            onChange={(e) => setEditingItem({ ...editingItem, [field.key]: e.target.checked })}
                                            className="w-5 h-5 border-slate-300 rounded text-brand-blue"
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Yes</span>
                                    </div>
                                ) : (
                                    <input
                                        type={field.type === 'number' ? 'number' : 'text'}
                                        step={field.type === 'number' ? '0.1' : undefined}
                                        value={editingItem[field.key] || ''}
                                        onChange={(e) => handleFieldChange(field.key, e.target.value, field.type)}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
                        <button type="submit" disabled={isSaving || uploadingImage} className="bg-brand-blue text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Data Manager</h1>
            
            {/* Nav Tabs */}
            <div className="flex space-x-2 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'border-brand-blue text-brand-blue' 
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <Icon className="w-4 h-4" /> {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* List View */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="font-bold text-lg capitalize">{activeTab.replace('_', ' ')} Database</h3>
                    <button 
                        onClick={() => setEditingItem({})}
                        className="bg-brand-green text-white font-bold px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1 text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </div>
                
                {isLoading ? (
                    <div className="p-12 pl-12 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No products found in this category.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Bank</th>
                                    <th className="px-6 py-4">Product Name</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-10 bg-slate-100 rounded border border-slate-200 relative overflow-hidden flex items-center justify-center">
                                                {item.image_url ? (
                                                    <Image src={item.image_url} alt="img" fill className="object-cover" unoptimized />
                                                ) : <span className="text-[10px] text-slate-400 font-semibold">None</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">{item.bank}</td>
                                        <td className="px-6 py-4">{item.name}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setEditingItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}