import { supabase } from '../lib/supabase';
import type { GroupBuy, GroupBuyInsert, Participant, ParticipantInsert, Message, MessageInsert } from '../types/database';

// ============================================================================
// GROUP BUYS
// ============================================================================

// Get all active group buys
export const getActiveGroupBuys = async () => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .select(`
        *,
        organizer:profiles!organizer_id(*)
      `)
      .eq('status', 'active')
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get active group buys error:', error);
    return { data: null, error: error.message };
  }
};

// Get group buy by ID
export const getGroupBuyById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .select(`
        *,
        organizer:profiles!organizer_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get group buy error:', error);
    return { data: null, error: error.message };
  }
};

// Get group buys by category
export const getGroupBuysByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .select(`
        *,
        organizer:profiles!organizer_id(*)
      `)
      .eq('category', category)
      .eq('status', 'active')
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get group buys by category error:', error);
    return { data: null, error: error.message };
  }
};

// Get group buys created by user
export const getUserGroupBuys = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .select('*')
      .eq('organizer_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get user group buys error:', error);
    return { data: null, error: error.message };
  }
};

// Create new group buy
export const createGroupBuy = async (groupBuy: Omit<GroupBuyInsert, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('=== createGroupBuy service ===');
    console.log('groupBuy:', groupBuy);

    // Check if profile exists for this organizer_id
    const { data: profileCheck, error: profileError } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('id', groupBuy.organizer_id)
      .maybeSingle();

    console.log('Profile check:', { profileCheck, profileError });

    if (!profileCheck) {
      console.error('NO PROFILE FOUND for user:', groupBuy.organizer_id);
      throw new Error('User profile not found. Please log out and log back in.');
    }

    const { data, error } = await supabase
      .from('group_buys')
      .insert(groupBuy)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Create group buy error:', error);
    return { data: null, error: error.message };
  }
};

// Update group buy
export const updateGroupBuy = async (id: string, updates: Partial<GroupBuy>) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Update group buy error:', error);
    return { data: null, error: error.message };
  }
};

// Delete/Cancel group buy
export const cancelGroupBuy = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Cancel group buy error:', error);
    return { data: null, error: error.message };
  }
};

// ============================================================================
// PARTICIPANTS (ORDERS)
// ============================================================================

// Join a group buy (create participant/order)
export const joinGroupBuy = async (groupBuyId: string, userId: string, price: number) => {
  try {
    const participantData: Omit<ParticipantInsert, 'id' | 'joined_at' | 'updated_at'> = {
      group_buy_id: groupBuyId,
      user_id: userId,
      quantity: 1,
      total_amount: price,
      status: 'confirmed',
    };

    const { data, error } = await supabase
      .from('participants')
      .insert(participantData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Join group buy error:', error);
    return { data: null, error: error.message };
  }
};

// Get user's orders (participated group buys)
export const getUserOrders = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        *,
        group_buy:group_buys!group_buy_id(
          *,
          organizer:profiles!organizer_id(*)
        )
      `)
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get user orders error:', error);
    return { data: null, error: error.message };
  }
};

// Get participants for a group buy
export const getGroupBuyParticipants = async (groupBuyId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        *,
        user:profiles!user_id(*)
      `)
      .eq('group_buy_id', groupBuyId)
      .order('joined_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get participants error:', error);
    return { data: null, error: error.message };
  }
};

// Check if user has joined a group buy
export const hasUserJoined = async (groupBuyId: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('id')
      .eq('group_buy_id', groupBuyId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return { hasJoined: !!data, error: null };
  } catch (error: any) {
    console.error('Check user joined error:', error);
    return { hasJoined: false, error: error.message };
  }
};

// Cancel participation
export const cancelParticipation = async (participantId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .update({ status: 'cancelled' })
      .eq('id', participantId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Cancel participation error:', error);
    return { data: null, error: error.message };
  }
};

// ============================================================================
// MESSAGES (CHAT)
// ============================================================================

// Get messages for a group buy
export const getGroupBuyMessages = async (groupBuyId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(*)
      `)
      .eq('group_buy_id', groupBuyId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get messages error:', error);
    return { data: null, error: error.message };
  }
};

// Send a message
export const sendMessage = async (groupBuyId: string, senderId: string, content: string) => {
  try {
    const messageData: Omit<MessageInsert, 'id' | 'created_at'> = {
      group_buy_id: groupBuyId,
      sender_id: senderId,
      content,
      message_type: 'text',
    };

    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select(`
        *,
        sender:profiles!sender_id(*)
      `)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Send message error:', error);
    return { data: null, error: error.message };
  }
};

// ============================================================================
// SEARCH
// ============================================================================

// Search group buys by keyword
export const searchGroupBuys = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from('group_buys')
      .select(`
        *,
        organizer:profiles!organizer_id(*)
      `)
      .eq('status', 'active')
      .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Search group buys error:', error);
    return { data: null, error: error.message };
  }
};
