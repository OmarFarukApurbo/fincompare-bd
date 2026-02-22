import { supabase } from './supabase';

// Helper to fetch all credit cards
export async function getCreditCards() {
    const { data, error } = await supabase
        .from('credit_cards')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching credit cards:', error);
        return [];
    }
    return data;
}

// Helper to fetch loans, optionally filtered by category
export async function getLoans(category?: string) {
    let query = supabase.from('loans').select('*').order('id', { ascending: true });

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching loans:', error);
        return [];
    }
    return data;
}

// Helper to fetch deposits
export async function getDeposits() {
    const { data, error } = await supabase
        .from('deposits')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching deposits:', error);
        return [];
    }
    return data;
}

// Helper to fetch shariah cards
export async function getShariahCards() {
    const { data, error } = await supabase
        .from('shariah_cards')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching shariah cards:', error);
        return [];
    }
    return data;
}
