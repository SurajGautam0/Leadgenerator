alter table leads add column if not exists website text not null default '';
alter table leads add column if not exists source_url text not null default '';

create table if not exists scrape_jobs (
  id serial primary key,
  user_id text not null,
  location text not null,
  verticals text not null,
  radius_km integer not null,
  depth text not null,
  status text not null default 'done',
  found integer not null default 0,
  crawled integer not null default 0,
  log text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists scrape_jobs_user_id_idx on scrape_jobs (user_id, created_at desc);
