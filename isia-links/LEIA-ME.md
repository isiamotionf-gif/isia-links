# ISIA MOTION | Links

Página de links da loja (WhatsApp, localização, loja online) com painel para você editar.

- `seusite.com.br/` é a página que o cliente vê.
- `seusite.com.br/admin` é o painel. Entra com e-mail e senha, edita e toca em **Salvar e publicar**.

Não precisa instalar nada nem rodar build. São arquivos prontos.

## Passo 1. Criar o banco no Supabase (grátis)

1. Entre em supabase.com e crie um projeto novo (pode chamar de `isia-links`). Guarde a senha do banco.
2. No menu da esquerda, abra **SQL Editor** e crie uma query nova.
3. Abra o arquivo `supabase.sql`. Troque `TROQUE_PELO_SEU_EMAIL` pelo seu e-mail nas **2 vezes** em que aparece. Cole tudo no SQL Editor e toque em **Run**.

## Passo 2. Criar o seu acesso e travar o cadastro

1. Menu **Authentication** > **Users** > **Add user** > **Create new user**. Use o mesmo e-mail do passo 1 e escolha uma senha forte. Marque a opção de confirmar o e-mail automaticamente.
2. Ainda em Authentication, abra **Sign In / Providers** (em alguns projetos aparece como **Settings**) e **desligue** "Allow new users to sign up".

Esse passo é importante. Com o cadastro desligado, só o seu usuário existe. Mesmo que alguém abra o `/admin`, não consegue entrar.

## Passo 3. Ligar o site ao banco

1. No Supabase, abra **Project Settings** > **API** (ou **Data API**).
2. Copie a **Project URL** e a chave **anon public**.
3. Abra o arquivo `config.js` e cole os dois valores no lugar do texto `COLE_AQUI...`.

A chave anon pode ficar pública. Quem protege a edição são as regras do banco e o seu e-mail.

## Passo 4. Colocar no ar (GitHub + Vercel)

1. Crie um repositório novo no GitHub e envie todos os arquivos desta pasta.
2. No Vercel, **Add New** > **Project** > escolha o repositório > em Framework Preset deixe **Other** > **Deploy**. Não precisa de comando de build.
3. Se quiser um endereço próprio, abra **Settings** > **Domains** no projeto do Vercel.

## Passo 5. Preencher e publicar

1. Abra `seusite.com.br/admin` e entre.
2. Em **Atalhos**, digite o WhatsApp com DDD e a mensagem pronta, e o endereço da loja. Toque em aplicar.
3. Ajuste o link da loja online e o horário de atendimento.
4. Toque em **Salvar e publicar**.
5. Coloque `seusite.com.br` na bio do Instagram.

## Dicas

- Para trocar a foto de fundo, use **Enviar sua foto** no painel.
- Se a página mostrar o conteúdo antigo, atualize. O navegador guarda uma cópia para abrir rápido e confere o banco logo em seguida.
- Link vazio no painel vira um aviso sem clique, bom para horário de atendimento.
