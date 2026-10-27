create table public.products_feedbacks (
  id text primary key,
  score integer not null check (score >= 1 and score <= 5),
  comment text not null,
  created_at timestamptz not null default now(),
  created_by text not null references public.accounts(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade
);

alter table public.products_feedbacks enable row level security;
