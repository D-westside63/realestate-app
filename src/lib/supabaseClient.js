import { createClient } from '@supabase/supabase-js'

// .envで管理しているSupabaseのProject URLとPublishable keyを取得する
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Supabaseの環境変数が設定されていません。.envファイルを確認してください。'
  )
}

// アプリ全体で共有するSupabaseクライアント
export const supabase = createClient(supabaseUrl, supabasePublishableKey)
