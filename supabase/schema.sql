-- 不動産管理アプリ用の物件テーブル
-- Supabaseダッシュボードの SQL Editor で実行してください。

-- 物件テーブルの作成
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- 自分が登録した物件を素早く絞り込めるようにインデックスを作成
create index if not exists properties_user_id_idx on public.properties (user_id);

-- RLS（Row Level Security）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "Select own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のユーザーIDでのみ新規登録できる
create policy "Insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
