create table public.products (
  id text primary key,
  name text not null,
  description text,
  image_url text,
  external_link text not null,
  score boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
