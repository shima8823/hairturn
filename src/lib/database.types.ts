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
      hairstyle_history: {
        Row: {
          created_at: string
          hairstyle_id: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          hairstyle_id: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          hairstyle_id?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'hairstyle_history_hairstyle_id_fkey'
            columns: ['hairstyle_id']
            isOneToOne: false
            referencedRelation: 'hairstyles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'hairstyle_history_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      hairstyles: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          is_deleted: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          is_deleted?: boolean | null
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          is_deleted?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'hairstyles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
