# Supabase Setup

Supabase es opcional. La demo debe seguir funcionando offline con `localStorage` aunque no existan variables.

## 1. Crear proyecto

Crear un proyecto en Supabase y esperar a que la base Postgres quede lista.

## 2. Copiar credenciales publicas

En Project Settings > API copiar:

- Project URL
- anon/public key

Nunca usar `service_role` en frontend.

## 3. Crear `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

## 4. Ejecutar schema

Abrir SQL Editor y ejecutar `docs/supabase-schema.sql`.

## 5. Ejecutar RLS

Ejecutar `docs/supabase-rls-policies.sql`.

RLS queda activo en:

- profiles
- cloud_saves
- decks
- collections
- achievements
- admin_content
- feedback
- user_roles

## 6. Crear primer admin

Despues de crear una cuenta, ejecutar:

```sql
insert into public.user_roles (user_id, role)
values ('USER_UUID_AQUI', 'admin')
on conflict do nothing;
```

Roles disponibles:

- user
- curator
- admin

## 7. Probar login

1. Ejecutar `npm run dev`.
2. Ir a `/login`.
3. Crear cuenta o iniciar sesion.
4. Verificar `/account`.

## 8. Probar sync

1. Iniciar sesion.
2. Ir a `/sync`.
3. Subir progreso local.
4. Bajar progreso de nube.
5. Probar fusion segura.

## Seguridad

- No exponer `service_role`.
- Mantener RLS activo.
- Validar saves antes de guardarlos.
- No guardar datos sensibles.
- El panel admin inicial no edita saves de usuarios ni borra usuarios.

## Referencias usadas

- Supabase Auth docs: https://supabase.com/docs/guides/auth/
- Supabase SSR para Next.js: https://supabase.com/docs/guides/auth/server-side
- Cliente SSR actual: https://supabase.com/docs/guides/auth/server-side/creating-a-client
