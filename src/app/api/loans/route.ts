import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type'); // e.g. personal, home, auto

        let query = supabase.from('loans').select('*');

        if (type) {
            query = query.eq('type', type);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error fetching loans:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Setup secure server-side fetching logic for "Audited" labels
        const enhancedData = data?.map(loan => ({
            ...loan,
            isAudited: loan.interest_rate < 10
        }));

        return NextResponse.json({ data: enhancedData || [] }, { status: 200 });
    } catch (err: any) {
        console.error('Internal API Error (loans):', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
