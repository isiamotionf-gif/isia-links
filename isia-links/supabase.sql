-- ISIA MOTION | Links
-- Rode este arquivo UMA vez: Supabase > SQL Editor > New query > cole tudo > Run.
--
-- ANTES DE RODAR: troque  TROQUE_PELO_SEU_EMAIL  (aparece 2 vezes, nas linhas
-- "dono insere" e "dono atualiza") pelo e-mail que você vai usar para entrar no painel.
-- Só esse e-mail consegue alterar a página. Qualquer pessoa pode apenas ler.

create table if not exists public.pagina (
  id int primary key default 1 check (id = 1),
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.pagina enable row level security;

drop policy if exists "leitura publica" on public.pagina;
drop policy if exists "dono insere" on public.pagina;
drop policy if exists "dono atualiza" on public.pagina;

create policy "leitura publica" on public.pagina
  for select using (true);

create policy "dono insere" on public.pagina
  for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'TROQUE_PELO_SEU_EMAIL');

create policy "dono atualiza" on public.pagina
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'TROQUE_PELO_SEU_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'TROQUE_PELO_SEU_EMAIL');
