# Guia do Gerador de Propostas (SaaS)

Transformamos o template estático em uma plataforma dinâmica. Agora você pode gerar propostas ilimitadas através de um painel administrativo.

## 1. Configuração Inicial (Importante!)

Antes de começar, você precisa conectar o sistema ao seu projeto Firebase.

1.  Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2.  Ative o **Authentication** (Email/Password).
3.  Ative o **Firestore Database** (Modo de produção ou teste).
4.  Ative o **Storage** (Para upload de logos).
5.  Copie as chaves de configuração do seu projeto.
6.  Crie um arquivo `.env.local` na raiz do projeto (use `.env.local.example` como base) e cole suas chaves.

## 2. Como Usar

### Acessando o Admin
1.  Acesse `http://localhost:3001/admin`.
2.  Se não estiver logado, você será redirecionado para o login.
3.  Use um usuário criado no Firebase Auth para entrar.

### Criando uma Proposta
1.  No Dashboard, clique em **Nova Proposta**.
2.  Preencha os dados:
    *   **Nome do Cliente**: Ex: "Clínica Santa Maria".
    *   **Slug**: O link da proposta (ex: `clinica-santa-maria`).
    *   **Branding**: Escolha as cores e faça upload da logo.
    *   **Módulos**: Ative/desative SDR, FAQ, No-Show, etc.
    *   **Preços**: Defina os valores de Setup e Mensal.
3.  Clique em **Salvar**.

### Visualizando a Proposta
1.  No Dashboard, clique em **Visualizar** no card da proposta.
2.  Ou acesse diretamente: `http://localhost:3001/p/[slug]`.

## 3. Estrutura do Projeto

*   `src/app/admin`: Área administrativa (Dashboard, Editor).
*   `src/app/p/[slug]`: Página pública da proposta (Dinâmica).
*   `src/lib/firebase.ts`: Configuração do Firebase.
*   `src/types/proposal.ts`: Definição dos dados da proposta.

## 4. Deploy

Para colocar no ar (Vercel):
1.  Conecte o repositório à Vercel.
2.  Adicione as variáveis de ambiente (do `.env.local`) nas configurações do projeto na Vercel.
3.  Faça o deploy.
