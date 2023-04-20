export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      file_data: {
        Row: {
          created_at: string | null
          duration: number | null
          id: string
          media_id: string
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          id?: string
          media_id: string
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          id?: string
          media_id?: string
        }
      }
      projects: {
        Row: {
          created_at: string
          id: string
          name: string
          timeline_json: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          timeline_json?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          timeline_json?: Json | null
          updated_at?: string
          user_id?: string
        }
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
