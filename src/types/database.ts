// Database types for Supabase tables
// These types match the schema in supabase/schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          wallet_balance: number
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          wallet_balance?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          wallet_balance?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          name_en: string | null
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          name_en?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_en?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
      }
      pickup_locations: {
        Row: {
          id: string
          name: string
          address: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      group_buys: {
        Row: {
          id: string
          organizer_id: string
          title: string
          description: string | null
          category: string | null
          image_url: string | null
          price: number
          original_price: number | null
          current_participants: number
          max_participants: number
          location: string
          pickup_location_id: string | null
          expires_at: string
          status: 'active' | 'completed' | 'cancelled' | 'expired'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizer_id: string
          title: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          price: number
          original_price?: number | null
          current_participants?: number
          max_participants: number
          location: string
          pickup_location_id?: string | null
          expires_at: string
          status?: 'active' | 'completed' | 'cancelled' | 'expired'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizer_id?: string
          title?: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          price?: number
          original_price?: number | null
          current_participants?: number
          max_participants?: number
          location?: string
          pickup_location_id?: string | null
          expires_at?: string
          status?: 'active' | 'completed' | 'cancelled' | 'expired'
          created_at?: string
          updated_at?: string
        }
      }
      participants: {
        Row: {
          id: string
          group_buy_id: string
          user_id: string
          quantity: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          joined_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          group_buy_id: string
          user_id: string
          quantity?: number
          total_amount: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          joined_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_buy_id?: string
          user_id?: string
          quantity?: number
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
          joined_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          group_buy_id: string
          sender_id: string
          content: string
          message_type: 'text' | 'image' | 'system'
          created_at: string
        }
        Insert: {
          id?: string
          group_buy_id: string
          sender_id: string
          content: string
          message_type?: 'text' | 'image' | 'system'
          created_at?: string
        }
        Update: {
          id?: string
          group_buy_id?: string
          sender_id?: string
          content?: string
          message_type?: 'text' | 'image' | 'system'
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'deposit' | 'purchase' | 'refund' | 'withdrawal'
          description: string | null
          reference_id: string | null
          balance_after: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'deposit' | 'purchase' | 'refund' | 'withdrawal'
          description?: string | null
          reference_id?: string | null
          balance_after?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'deposit' | 'purchase' | 'refund' | 'withdrawal'
          description?: string | null
          reference_id?: string | null
          balance_after?: number | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'group_buy' | 'order' | 'chat'
          is_read: boolean
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'group_buy' | 'order' | 'chat'
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'group_buy' | 'order' | 'chat'
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']

export type PickupLocation = Database['public']['Tables']['pickup_locations']['Row']
export type PickupLocationInsert = Database['public']['Tables']['pickup_locations']['Insert']

export type GroupBuy = Database['public']['Tables']['group_buys']['Row']
export type GroupBuyInsert = Database['public']['Tables']['group_buys']['Insert']
export type GroupBuyUpdate = Database['public']['Tables']['group_buys']['Update']

export type Participant = Database['public']['Tables']['participants']['Row']
export type ParticipantInsert = Database['public']['Tables']['participants']['Insert']
export type ParticipantUpdate = Database['public']['Tables']['participants']['Update']

export type Message = Database['public']['Tables']['messages']['Row']
export type MessageInsert = Database['public']['Tables']['messages']['Insert']

export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

// Extended types with joins (for common queries)
export type GroupBuyWithOrganizer = GroupBuy & {
  organizer: Profile
}

export type GroupBuyWithDetails = GroupBuy & {
  organizer: Profile
  participants_count: number
  user_participated?: boolean
}

export type ParticipantWithDetails = Participant & {
  group_buy: GroupBuy
  user: Profile
}

export type MessageWithSender = Message & {
  sender: Profile
}

export type NotificationWithUser = Notification & {
  user: Profile
}
