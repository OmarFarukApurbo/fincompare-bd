import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = supabase.from('cards').select('*');

        if (category) {
            query = query.eq('category', category);
        }

        // Setup secure server-side fetching
        query = query.order('rating', { ascending: false });

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error fetching cards:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Add "Audited" data label dynamically to premium cards
        const enhancedData = data?.map(card => ({
            ...card,
            isAudited: card.rating > 4.5
        }));

        return NextResponse.json({ data: enhancedData || [] }, { status: 200 });
    } catch (err: any) {
        console.error('Internal API Error (cards):', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
