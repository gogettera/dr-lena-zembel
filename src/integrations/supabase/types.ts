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
      clinic_info: {
        Row: {
          address: string
          description: string | null
          email: string | null
          hours: Json
          id: number
          name: string
          phone: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          description?: string | null
          email?: string | null
          hours?: Json
          id?: number
          name: string
          phone: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          description?: string | null
          email?: string | null
          hours?: Json
          id?: number
          name?: string
          phone?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      clinic_staff: {
        Row: {
          bio: string | null
          created_at: string
          id: number
          image_url: string | null
          is_active: boolean
          name: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_active?: boolean
          name: string
          role: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_active?: boolean
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      doctor_info: {
        Row: {
          approach: string | null
          display_name: string
          education: string | null
          experience: string | null
          full_name: string
          id: number
          languages: string | null
          profile_image: string | null
          specialties: Json
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          approach?: string | null
          display_name: string
          education?: string | null
          experience?: string | null
          full_name: string
          id?: number
          languages?: string | null
          profile_image?: string | null
          specialties?: Json
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          approach?: string | null
          display_name?: string
          education?: string | null
          experience?: string | null
          full_name?: string
          id?: number
          languages?: string | null
          profile_image?: string | null
          specialties?: Json
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      facebook_posts: {
        Row: {
          comments_count: number | null
          content: string | null
          created_at: string | null
          fetched_at: string | null
          id: string
          image_url: string | null
          likes_count: number | null
          platform: string
          post_url: string | null
          shares_count: number | null
          video_url: string | null
        }
        Insert: {
          comments_count?: number | null
          content?: string | null
          created_at?: string | null
          fetched_at?: string | null
          id: string
          image_url?: string | null
          likes_count?: number | null
          platform?: string
          post_url?: string | null
          shares_count?: number | null
          video_url?: string | null
        }
        Update: {
          comments_count?: number | null
          content?: string | null
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          platform?: string
          post_url?: string | null
          shares_count?: number | null
          video_url?: string | null
        }
        Relationships: []
      }
      google_reviews: {
        Row: {
          author_name: string
          created_at: string
          id: string
          profile_photo_url: string | null
          rating: number
          relative_time_description: string | null
          review_link: string | null
          text: string | null
        }
        Insert: {
          author_name: string
          created_at?: string
          id?: string
          profile_photo_url?: string | null
          rating: number
          relative_time_description?: string | null
          review_link?: string | null
          text?: string | null
        }
        Update: {
          author_name?: string
          created_at?: string
          id?: string
          profile_photo_url?: string | null
          rating?: number
          relative_time_description?: string | null
          review_link?: string | null
          text?: string | null
        }
        Relationships: []
      }
      site_meta: {
        Row: {
          canonical_url: string | null
          description: string
          facebook_pixel_id: string | null
          favicon_url: string | null
          google_analytics_id: string | null
          id: number
          og_description: string
          og_image_url: string | null
          og_title: string
          title: string
          twitter_card: string | null
          twitter_description: string | null
          twitter_title: string | null
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          description: string
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          google_analytics_id?: string | null
          id?: number
          og_description: string
          og_image_url?: string | null
          og_title: string
          title: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          description?: string
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          google_analytics_id?: string | null
          id?: number
          og_description?: string
          og_image_url?: string | null
          og_title?: string
          title?: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_social: {
        Row: {
          facebook: string | null
          facebook_page_id: string | null
          id: number
          instagram: string | null
          linkedin: string | null
          show_social_icons: boolean | null
          twitter: string | null
          updated_at: string | null
          youtube: string | null
        }
        Insert: {
          facebook?: string | null
          facebook_page_id?: string | null
          id?: number
          instagram?: string | null
          linkedin?: string | null
          show_social_icons?: boolean | null
          twitter?: string | null
          updated_at?: string | null
          youtube?: string | null
        }
        Update: {
          facebook?: string | null
          facebook_page_id?: string | null
          id?: number
          instagram?: string | null
          linkedin?: string | null
          show_social_icons?: boolean | null
          twitter?: string | null
          updated_at?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string
          height: number
          id: string
          poster: string | null
          src: string | null
          title: string
          updated_at: string
          width: number
        }
        Insert: {
          created_at?: string
          height?: number
          id?: string
          poster?: string | null
          src?: string | null
          title: string
          updated_at?: string
          width?: number
        }
        Update: {
          created_at?: string
          height?: number
          id?: string
          poster?: string | null
          src?: string | null
          title?: string
          updated_at?: string
          width?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_update_site_meta: {
        Args: { meta_data: Json }
        Returns: undefined
      }
      get_last_google_reviews_sync: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
