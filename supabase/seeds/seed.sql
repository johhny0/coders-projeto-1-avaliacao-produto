-- Development seed data only. The demo account password is: demo-password-123
-- Do not run this seed in production.
begin;

insert into public.accounts (
  id,
  first_name,
  last_name,
  email,
  password,
  active
)
values (
  'seed-account-demo',
  'Alex',
  'Morgan',
  'demo@example.test',
  '$2b$10$P5yp2uq0HB6GvI6Z5zxFh.HIcSlZsXZGyKnDkSR4gliuB1/cErKP2',
  true
)
on conflict (id) do nothing;

insert into public.products (
  id,
  name,
  description,
  image_url,
  external_link,
  score
)
values
  (
    'seed-product-desk-organizer',
    'Desk Organizer',
    'A compact organizer designed to keep everyday desk essentials within reach.',
    null,
    'https://example.com/products/desk-organizer',
    false
  ),
  (
    'seed-product-insulated-bottle',
    'Insulated Bottle',
    'A reusable bottle with a leak-resistant lid for everyday use.',
    null,
    'https://example.com/products/insulated-bottle',
    false
  ),
  (
    'seed-product-weekly-planner',
    'Weekly Planner',
    'A simple paper planner for organizing tasks and priorities throughout the week.',
    null,
    'https://example.com/products/weekly-planner',
    false
  )
on conflict (id) do nothing;

insert into public.products_feedbacks (
  id,
  score,
  comment,
  created_by,
  product_id
)
values
  (
    'seed-feedback-desk-organizer',
    5,
    'It keeps my workspace tidy and makes small items easy to find.',
    'seed-account-demo',
    'seed-product-desk-organizer'
  ),
  (
    'seed-feedback-insulated-bottle',
    4,
    'The bottle is easy to carry and the lid has not leaked in my bag.',
    'seed-account-demo',
    'seed-product-insulated-bottle'
  ),
  (
    'seed-feedback-weekly-planner',
    4,
    'The weekly layout is clear and helps me keep track of priorities.',
    'seed-account-demo',
    'seed-product-weekly-planner'
  )
on conflict (id) do nothing;

commit;
