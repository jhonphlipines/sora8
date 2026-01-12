export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_link_id: string
          clicked_at: string
          id: string
          ip_address: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_link_id: string
          clicked_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_link_id?: string
          clicked_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_clicks_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_stats"
            referencedColumns: ["link_id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          referral_code: string
          upi_id: string | null
          upi_phone_number: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          referral_code: string
          upi_id?: string | null
          upi_phone_number?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          referral_code?: string
          upi_id?: string | null
          upi_phone_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_payouts: {
        Row: {
          amount: number
          currency: string
          id: string
          payout_type: string
          processed_at: string | null
          requested_at: string
          status: string
          upi_id: string | null
          upi_phone_number: string | null
          user_id: string
        }
        Insert: {
          amount: number
          currency?: string
          id?: string
          payout_type?: string
          processed_at?: string | null
          requested_at?: string
          status?: string
          upi_id?: string | null
          upi_phone_number?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          currency?: string
          id?: string
          payout_type?: string
          processed_at?: string | null
          requested_at?: string
          status?: string
          upi_id?: string | null
          upi_phone_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_signups: {
        Row: {
          affiliate_link_id: string
          converted_at: string | null
          converted_to_paid: boolean
          id: string
          referred_user_id: string
          signed_up_at: string
        }
        Insert: {
          affiliate_link_id: string
          converted_at?: string | null
          converted_to_paid?: boolean
          id?: string
          referred_user_id: string
          signed_up_at?: string
        }
        Update: {
          affiliate_link_id?: string
          converted_at?: string | null
          converted_to_paid?: boolean
          id?: string
          referred_user_id?: string
          signed_up_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_signups_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_signups_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_stats"
            referencedColumns: ["link_id"]
          },
        ]
      }
      certificate_purchases: {
        Row: {
          amount: number
          certificate_id: string
          id: string
          purchased_at: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          certificate_id: string
          id?: string
          purchased_at?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          certificate_id?: string
          id?: string
          purchased_at?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_purchases_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "user_certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          credits_purchased: number
          id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          credits_purchased: number
          id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          credits_purchased?: number
          id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_certificates: {
        Row: {
          category_id: string
          certificate_name: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          category_id: string
          certificate_name: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          category_id?: string
          certificate_name?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_course_progress: {
        Row: {
          category_id: string
          completed_at: string
          id: string
          level_id: string
          score: number
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          category_id: string
          completed_at?: string
          id?: string
          level_id: string
          score: number
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          category_id?: string
          completed_at?: string
          id?: string
          level_id?: string
          score?: number
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
          video_id: string | null
          video_title: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
          video_id?: string | null
          video_title?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
          video_id?: string | null
          video_title?: string | null
        }
        Relationships: []
      }
      user_problems_solved: {
        Row: {
          id: string
          language: string
          problem_id: string
          solved_at: string
          test_cases_passed: number | null
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          id?: string
          language: string
          problem_id: string
          solved_at?: string
          test_cases_passed?: number | null
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          id?: string
          language?: string
          problem_id?: string
          solved_at?: string
          test_cases_passed?: number | null
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      affiliate_stats: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          link_id: string | null
          paid_count: number | null
          referral_code: string | null
          total_clicks: number | null
          total_signups: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_referral_code: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
