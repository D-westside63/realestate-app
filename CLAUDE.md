# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code) へ向けたガイダンスを提供します。

## プロジェクト概要

- **プロジェクト名**: realestate-app
- **概要**: 不動産情報を集約するアプリ
- **主な機能**: 認証・認可機能

## 技術スタック

- React + Vite
- Supabase（認証: Supabase Auth）
- react-router-dom（ルーティング）

## ディレクトリ構成

- `src/lib/supabaseClient.js`: Supabaseクライアントの初期化（.envの環境変数を使用）
- `src/context/AuthContext.jsx`: 認証状態（セッション）を管理するContext
- `src/routes/ProtectedRoute.jsx`: 未ログイン時にログイン画面へリダイレクトするラッパー
- `src/pages/`: ログイン・会員登録・物件一覧の各画面

## 環境変数

- `.env`にSupabaseのProject URL・Publishable keyを保持する（`.gitignore`で除外済み）
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- 実際の値を含まない`.env.example`をテンプレートとしてコミットする

## 開発方針

- 認証(Authentication)と認可(Authorization)を明確に分離して実装する
  - 認証: ユーザーが誰であるかを確認する処理（Supabase Authのメール＋パスワード認証）
  - 認可: 認証されたユーザーが特定の操作・リソースにアクセスできるかを制御する処理（`ProtectedRoute`によるルート保護）
- 不動産情報の集約・表示を中心に、シンプルな構成を保つ
- コメントは日本語で記載する
- 過剰な抽象化は避け、必要な範囲でシンプルに実装する
