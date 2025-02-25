export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      bundles: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bundles_on_items: {
        Row: {
          added_at: string
          bundle_id: string
          item_id: string
        }
        Insert: {
          added_at?: string
          bundle_id: string
          item_id: string
        }
        Update: {
          added_at?: string
          bundle_id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundles_on_items_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundles_on_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "saved_items"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_history: {
        Row: {
          bundle_id: string | null
          created_at: string
          email_to: string
          epub_url: string | null
          error_msg: string | null
          id: string
          status: Database["public"]["Enums"]["delivery_status"]
          user_id: string
        }
        Insert: {
          bundle_id?: string | null
          created_at?: string
          email_to: string
          epub_url?: string | null
          error_msg?: string | null
          id: string
          status: Database["public"]["Enums"]["delivery_status"]
          user_id: string
        }
        Update: {
          bundle_id?: string | null
          created_at?: string
          email_to?: string
          epub_url?: string | null
          error_msg?: string | null
          id?: string
          status?: Database["public"]["Enums"]["delivery_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_history_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      folders: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id: string
          name: string
          parent_id?: string | null
          updated_at: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_items: {
        Row: {
          content: string | null
          created_at: string
          favicon: string | null
          folder_id: string | null
          id: string
          image_url: string | null
          is_archived: boolean
          is_read: boolean
          reading_time: number | null
          summary: string | null
          title: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          favicon?: string | null
          folder_id?: string | null
          id: string
          image_url?: string | null
          is_archived?: boolean
          is_read?: boolean
          reading_time?: number | null
          summary?: string | null
          title: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at: string
          url: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          favicon?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string | null
          is_archived?: boolean
          is_read?: boolean
          reading_time?: number | null
          summary?: string | null
          title?: string
          type?: Database["public"]["Enums"]["saved_item_type"]
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id: string
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags_on_items: {
        Row: {
          assigned_at: string
          item_id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          item_id: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          item_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_on_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "saved_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_on_items_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          image: string | null
          kindle_email: string | null
          name: string | null
          notification_prefs: Json
          role: string
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          image?: string | null
          kindle_email?: string | null
          name?: string | null
          notification_prefs?: Json
          role?: string
          stripe_customer_id?: string | null
          updated_at: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image?: string | null
          kindle_email?: string | null
          name?: string | null
          notification_prefs?: Json
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      delivery_status: "PENDING" | "PROCESSING" | "SENT" | "FAILED"
      saved_item_type: "BOOKMARK" | "READING_LIST"
      subscription_tier: "FREE" | "PREMIUM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
