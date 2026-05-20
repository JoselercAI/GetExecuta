create table if not exists deck_access_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists deck_access_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references deck_access_users(id) on delete set null,
  email text not null,
  event_type text not null check (event_type in ('register', 'login')),
  user_agent text,
  created_at timestamptz not null default now()
);

alter table deck_access_users enable row level security;
alter table deck_access_events enable row level security;
