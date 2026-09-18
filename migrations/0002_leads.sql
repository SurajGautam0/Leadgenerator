create table if not exists leads (
  id serial primary key,
  user_id text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  region text not null,
  postal_code text not null,
  location_label text not null,
  property_type text not null,
  service text not null,
  trigger_reason text not null,
  score integer not null,
  estimated_value integer not null,
  status text not null default 'new',
  notes text not null default '',
  source text not null default 'generated',
  created_at timestamptz not null default now()
);

create index if not exists leads_user_id_idx on leads (user_id);
create index if not exists leads_user_status_idx on leads (user_id, status);
create index if not exists leads_user_created_idx on leads (user_id, created_at desc);
