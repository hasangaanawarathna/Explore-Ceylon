-- Run manually in the Supabase SQL Editor. This creates configuration and
-- policies only; it does not change catalog records or existing objects.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'destination-images',
  'destination-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

drop policy if exists "destination images are publicly readable" on storage.objects;
drop policy if exists "admins upload destination images" on storage.objects;
drop policy if exists "admins update destination images" on storage.objects;
drop policy if exists "admins delete destination images" on storage.objects;

create policy "destination images are publicly readable"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'destination-images');

create policy "admins upload destination images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'destination-images' and public.is_admin());

create policy "admins update destination images"
on storage.objects for update
to authenticated
using (bucket_id = 'destination-images' and public.is_admin())
with check (bucket_id = 'destination-images' and public.is_admin());

create policy "admins delete destination images"
on storage.objects for delete
to authenticated
using (bucket_id = 'destination-images' and public.is_admin());
