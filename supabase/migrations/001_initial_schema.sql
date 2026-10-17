-- Explore Ceylon schema. Safe to run on a new Supabase project.
create extension if not exists pgcrypto;

create type public.booking_status as enum ('pending', 'approved', 'paid', 'completed', 'cancelled');
create type public.enquiry_status as enum ('new', 'contacted', 'quoted', 'won', 'closed');
create type public.admin_role as enum ('admin', 'editor');

create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.admin_role not null default 'editor',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 120),
  location text not null,
  region text not null,
  summary text not null,
  image text not null,
  price_usd numeric(10,2) not null check (price_usd >= 0),
  duration text not null,
  best_time text not null,
  activities text[] not null default '{}',
  google_maps_url text not null,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.travel_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 160),
  summary text not null,
  price_usd numeric(10,2) not null check (price_usd >= 0),
  duration text not null,
  category text not null,
  image text not null,
  features text[] not null default '{}',
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id text primary key,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 200),
  phone text,
  subject text not null check (char_length(subject) between 1 and 200),
  message text not null check (char_length(message) between 10 and 4000),
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id text primary key,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 200),
  phone text not null check (char_length(phone) <= 50),
  destination text not null check (char_length(destination) <= 120),
  start_point text not null check (char_length(start_point) <= 200),
  finish_point text not null check (char_length(finish_point) <= 200),
  travel_date date not null,
  guests integer not null check (guests between 1 and 100),
  notes text check (char_length(notes) <= 2000),
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null check (jsonb_typeof(value) = 'object'),
  updated_at timestamptz not null default now()
);

create index destinations_published_order_idx on public.destinations (is_published, sort_order);
create index packages_published_order_idx on public.travel_packages (is_published, sort_order);
create index bookings_status_created_idx on public.bookings (status, created_at desc);
create index enquiries_status_created_idx on public.enquiries (status, created_at desc);

create function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger destinations_updated before update on public.destinations for each row execute function public.set_updated_at();
create trigger packages_updated before update on public.travel_packages for each row execute function public.set_updated_at();
create trigger bookings_updated before update on public.bookings for each row execute function public.set_updated_at();
create trigger enquiries_updated before update on public.enquiries for each row execute function public.set_updated_at();
create trigger settings_updated before update on public.site_settings for each row execute function public.set_updated_at();
create trigger admins_updated before update on public.admin_profiles for each row execute function public.set_updated_at();

create function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admin_profiles where user_id = auth.uid() and is_active);
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.travel_packages enable row level security;
alter table public.enquiries enable row level security;
alter table public.bookings enable row level security;
alter table public.site_settings enable row level security;

create policy "admins read own profile" on public.admin_profiles for select to authenticated using (user_id = auth.uid());
create policy "published destinations are public" on public.destinations for select to anon, authenticated using (is_published or public.is_admin());
create policy "admins manage destinations" on public.destinations for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "published packages are public" on public.travel_packages for select to anon, authenticated using (is_published or public.is_admin());
create policy "admins manage packages" on public.travel_packages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public creates enquiries" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "admins manage enquiries" on public.enquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public creates bookings" on public.bookings for insert to anon, authenticated with check (status = 'pending' and travel_date >= current_date);
create policy "admins manage bookings" on public.bookings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "main site settings are public" on public.site_settings for select to anon, authenticated using (key = 'main');
create policy "admins manage settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

revoke all on all tables in schema public from anon, authenticated;
grant select on public.destinations, public.travel_packages, public.site_settings to anon, authenticated;
grant insert on public.enquiries, public.bookings to anon, authenticated;
grant select, insert, update, delete on public.destinations, public.travel_packages, public.enquiries, public.bookings, public.site_settings to authenticated;
grant select on public.admin_profiles to authenticated;
