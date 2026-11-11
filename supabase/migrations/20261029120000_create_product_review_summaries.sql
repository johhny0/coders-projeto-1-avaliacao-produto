create table public.product_review_summaries (
  product_id text primary key references public.products(id) on delete cascade,
  summary text not null,
  reviews_count integer not null default 0,
  latest_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.product_review_summaries enable row level security;
