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
          first_name: string | null
          last_name: string | null
          phone: string | null
          postal_code: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          price: number | null
          location: string | null
          postal_code: string
          client_id: string
          tasker_id: string | null
          created_at: string
          updated_at: string
          scheduled_for: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          price?: number | null
          location?: string | null
          postal_code: string
          client_id: string
          tasker_id?: string | null
          created_at?: string
          updated_at?: string
          scheduled_for?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          price?: number | null
          location?: string | null
          postal_code?: string
          client_id?: string
          tasker_id?: string | null
          created_at?: string
          updated_at?: string
          scheduled_for?: string | null
          completed_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      task_categories: {
        Row: {
          task_id: string
          category_id: string
        }
        Insert: {
          task_id: string
          category_id: string
        }
        Update: {
          task_id?: string
          category_id?: string
        }
      }
      reviews: {
        Row: {
          id: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
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
