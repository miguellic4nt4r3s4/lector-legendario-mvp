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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      avatar_items: {
        Row: {
          asset: string
          category: string
          code: string
          created_at: string
          description: string
          id: string
          is_starter: boolean
          name: string
          rarity: string
          required_badge_code: string | null
          sort_order: number
          unlock_condition: string
        }
        Insert: {
          asset: string
          category: string
          code: string
          created_at?: string
          description: string
          id?: string
          is_starter?: boolean
          name: string
          rarity: string
          required_badge_code?: string | null
          sort_order?: number
          unlock_condition: string
        }
        Update: {
          asset?: string
          category?: string
          code?: string
          created_at?: string
          description?: string
          id?: string
          is_starter?: boolean
          name?: string
          rarity?: string
          required_badge_code?: string | null
          sort_order?: number
          unlock_condition?: string
        }
        Relationships: []
      }
      aventuras: {
        Row: {
          ambientacion: string | null
          created_at: string
          descripcion: string
          id: string
          orden: number
          titulo: string
        }
        Insert: {
          ambientacion?: string | null
          created_at?: string
          descripcion: string
          id?: string
          orden?: number
          titulo: string
        }
        Update: {
          ambientacion?: string | null
          created_at?: string
          descripcion?: string
          id?: string
          orden?: number
          titulo?: string
        }
        Relationships: []
      }
      cursos: {
        Row: {
          codigo: string
          created_at: string
          docente_id: string | null
          id: string
          nombre: string
        }
        Insert: {
          codigo: string
          created_at?: string
          docente_id?: string | null
          id?: string
          nombre: string
        }
        Update: {
          codigo?: string
          created_at?: string
          docente_id?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      hero_insignias: {
        Row: {
          hero_id: string
          id: string
          insignia_id: string
          obtenida_at: string
        }
        Insert: {
          hero_id: string
          id?: string
          insignia_id: string
          obtenida_at?: string
        }
        Update: {
          hero_id?: string
          id?: string
          insignia_id?: string
          obtenida_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hero_insignias_hero_id_fkey"
            columns: ["hero_id"]
            isOneToOne: false
            referencedRelation: "heroes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hero_insignias_insignia_id_fkey"
            columns: ["insignia_id"]
            isOneToOne: false
            referencedRelation: "insignias"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_inventory: {
        Row: {
          category: string
          equipped: boolean
          hero_id: string
          id: string
          item_id: string
          unlocked_at: string
          updated_at: string
        }
        Insert: {
          category: string
          equipped?: boolean
          hero_id: string
          id?: string
          item_id: string
          unlocked_at?: string
          updated_at?: string
        }
        Update: {
          category?: string
          equipped?: boolean
          hero_id?: string
          id?: string
          item_id?: string
          unlocked_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hero_inventory_hero_id_fkey"
            columns: ["hero_id"]
            isOneToOne: false
            referencedRelation: "heroes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hero_inventory_item_category_fkey"
            columns: ["item_id", "category"]
            isOneToOne: false
            referencedRelation: "avatar_items"
            referencedColumns: ["id", "category"]
          },
        ]
      }
      heroes: {
        Row: {
          avatar: string
          clase: string
          created_at: string
          id: string
          nivel: number
          nombre: string
          profile_id: string
          xp: number
        }
        Insert: {
          avatar?: string
          clase: string
          created_at?: string
          id?: string
          nivel?: number
          nombre: string
          profile_id: string
          xp?: number
        }
        Update: {
          avatar?: string
          clase?: string
          created_at?: string
          id?: string
          nivel?: number
          nombre?: string
          profile_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "heroes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insignias: {
        Row: {
          codigo: string
          descripcion: string
          icono: string
          id: string
          nombre: string
        }
        Insert: {
          codigo: string
          descripcion: string
          icono?: string
          id?: string
          nombre: string
        }
        Update: {
          codigo?: string
          descripcion?: string
          icono?: string
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      intentos: {
        Row: {
          correcto: boolean
          created_at: string
          hero_id: string
          id: string
          opcion_elegida: number
          reto_id: string
        }
        Insert: {
          correcto: boolean
          created_at?: string
          hero_id: string
          id?: string
          opcion_elegida: number
          reto_id: string
        }
        Update: {
          correcto?: boolean
          created_at?: string
          hero_id?: string
          id?: string
          opcion_elegida?: number
          reto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "intentos_hero_id_fkey"
            columns: ["hero_id"]
            isOneToOne: false
            referencedRelation: "heroes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intentos_reto_id_fkey"
            columns: ["reto_id"]
            isOneToOne: false
            referencedRelation: "retos"
            referencedColumns: ["id"]
          },
        ]
      }
      misiones: {
        Row: {
          aventura_id: string
          created_at: string
          disponible: boolean
          id: string
          orden: number
          sinopsis: string
          texto_lectura: string
          titulo: string
          xp_base: number
        }
        Insert: {
          aventura_id: string
          created_at?: string
          disponible?: boolean
          id?: string
          orden?: number
          sinopsis: string
          texto_lectura: string
          titulo: string
          xp_base?: number
        }
        Update: {
          aventura_id?: string
          created_at?: string
          disponible?: boolean
          id?: string
          orden?: number
          sinopsis?: string
          texto_lectura?: string
          titulo?: string
          xp_base?: number
        }
        Relationships: [
          {
            foreignKeyName: "misiones_aventura_id_fkey"
            columns: ["aventura_id"]
            isOneToOne: false
            referencedRelation: "aventuras"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          curso_id: string | null
          id: string
          nombre: string
          rol: Database["public"]["Enums"]["rol_usuario"]
        }
        Insert: {
          created_at?: string
          curso_id?: string | null
          id: string
          nombre: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
        }
        Update: {
          created_at?: string
          curso_id?: string | null
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_curso_fk"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
        ]
      }
      progreso_misiones: {
        Row: {
          aciertos: number
          actualizado_at: string
          completada: boolean
          hero_id: string
          id: string
          mision_id: string
          total: number
          xp_ganado: number
        }
        Insert: {
          aciertos?: number
          actualizado_at?: string
          completada?: boolean
          hero_id: string
          id?: string
          mision_id: string
          total?: number
          xp_ganado?: number
        }
        Update: {
          aciertos?: number
          actualizado_at?: string
          completada?: boolean
          hero_id?: string
          id?: string
          mision_id?: string
          total?: number
          xp_ganado?: number
        }
        Relationships: [
          {
            foreignKeyName: "progreso_misiones_hero_id_fkey"
            columns: ["hero_id"]
            isOneToOne: false
            referencedRelation: "heroes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progreso_misiones_mision_id_fkey"
            columns: ["mision_id"]
            isOneToOne: false
            referencedRelation: "misiones"
            referencedColumns: ["id"]
          },
        ]
      }
      retos: {
        Row: {
          competencia: Database["public"]["Enums"]["competencia_lit"]
          enunciado: string
          id: string
          mision_id: string
          opciones: Json
          orden: number
          pista: string | null
          respuesta_correcta: number
          retroalimentacion_correcta: string
          retroalimentacion_incorrecta: string
          xp: number
        }
        Insert: {
          competencia: Database["public"]["Enums"]["competencia_lit"]
          enunciado: string
          id?: string
          mision_id: string
          opciones: Json
          orden?: number
          pista?: string | null
          respuesta_correcta: number
          retroalimentacion_correcta: string
          retroalimentacion_incorrecta: string
          xp?: number
        }
        Update: {
          competencia?: Database["public"]["Enums"]["competencia_lit"]
          enunciado?: string
          id?: string
          mision_id?: string
          opciones?: Json
          orden?: number
          pista?: string | null
          respuesta_correcta?: number
          retroalimentacion_correcta?: string
          retroalimentacion_incorrecta?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "retos_mision_id_fkey"
            columns: ["mision_id"]
            isOneToOne: false
            referencedRelation: "misiones"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      docente_de_estudiante: {
        Args: { _docente: string; _estudiante: string }
        Returns: boolean
      }
      es_docente: { Args: { _user: string }; Returns: boolean }
    }
    Enums: {
      competencia_lit:
        | "literal"
        | "inferencial"
        | "critica"
        | "vocabulario"
        | "estructura"
      rol_usuario: "estudiante" | "docente"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      competencia_lit: [
        "literal",
        "inferencial",
        "critica",
        "vocabulario",
        "estructura",
      ],
      rol_usuario: ["estudiante", "docente"],
    },
  },
} as const
