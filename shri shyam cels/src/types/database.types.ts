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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          category_id: string
          subcategory_id: string | null
          description: string | null
          price: number | null
          price_on_request: boolean
          unit: string | null
          availability: string
          in_stock: boolean
          image_url: string | null
          is_best_seller: boolean
          is_new: boolean
          features: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id: string
          subcategory_id?: string | null
          description?: string | null
          price?: number | null
          price_on_request?: boolean
          unit?: string | null
          availability?: string
          in_stock?: boolean
          image_url?: string | null
          is_best_seller?: boolean
          is_new?: boolean
          features?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string
          subcategory_id?: string | null
          description?: string | null
          price?: number | null
          price_on_request?: boolean
          unit?: string | null
          availability?: string
          in_stock?: boolean
          image_url?: string | null
          is_best_seller?: boolean
          is_new?: boolean
          features?: Json
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string | null
          email: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          role?: string
          created_at?: string
        }
      }
    }
  }
}
