-- Run only after creating the administrator in Supabase Authentication > Users.
-- Replace the email; this does not create or store a password in SQL.
insert into public.admin_profiles (user_id, role)
select id, 'admin'::public.admin_role from auth.users
where lower(email) = lower('REPLACE_WITH_ADMIN_EMAIL')
on conflict (user_id) do update set role = excluded.role, is_active = true;
