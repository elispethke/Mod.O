# mod.o — Fashion Studio

Website institucional da mod.o Fashion Studio. React 19 + TypeScript + Vite + Tailwind CSS, com animações via Framer Motion.

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** — build e dev server
- **Tailwind CSS 3** — sistema de design tokenizado (ver `src/config/tokens.ts`)
- **Framer Motion** — animações e microinterações
- **React Router 7** — roteamento (home + páginas legais)
- **React Hook Form + Zod** — formulário de contato e validação
- **Radix UI** — primitivas acessíveis (modal de preferências de cookies)

## Como rodar

```bash
npm install
cp .env.example .env   # preencha VITE_FORMSPREE_ENDPOINT
npm run dev
```

## Scripts

| Comando           | O que faz                                      |
|--------------------|-------------------------------------------------|
| `npm run dev`      | Servidor de desenvolvimento (Vite)              |
| `npm run build`    | Type-check (`tsc`) + build de produção          |
| `npm run preview`  | Serve o build de produção localmente            |
| `npm run lint`     | Type-check isolado (`tsc --noEmit`)             |

## Variáveis de ambiente

Ver `.env.example`. O formulário de contato envia via [Formspree](https://formspree.io); sem `VITE_FORMSPREE_ENDPOINT` configurada, o formulário exibe um erro amigável em vez de falhar silenciosamente (ver `src/features/home/contact/useContactForm.ts`).

## Fontes de marca

As fontes Parabolica (títulos) e Franie (corpo de texto) são proprietárias e ficam em `public/fonts/` (não versionadas por padrão — ver `.gitignore` se isso mudar). Caso os arquivos não estejam presentes, o site usa a stack de fallback definida em `src/styles/globals.css` (DM Sans / Inter / Helvetica Neue) sem quebrar.

## Estrutura do projeto

```
src/
├── assets/            # imagens processadas pelo pipeline do Vite (WebP)
├── config/
│   ├── tokens.ts       # fonte única de verdade do design system (cor, tipografia, espaçamento, motion, z-index)
│   └── motion.ts       # curva de easing padrão para Framer Motion
├── constants/          # rotas e conteúdo institucional (SITE, NAV_ITEMS, SERVICES)
├── features/           # um diretório por domínio de produto
│   ├── home/            # seções da página inicial (hero, about, services, portfolio, contact)
│   ├── layout/           # header, nav, footer
│   ├── cookie-consent/   # banner + modal de preferências + persistência (LGPD/GDPR)
│   └── legal/            # política de privacidade e termos de uso
├── shared/
│   ├── components/      # componentes reutilizáveis entre features (AnimatedText, ImageReveal...)
│   ├── hooks/            # hooks reutilizáveis (useScrollProgress, useSectionNav...)
│   └── ui/                # primitivos de formulário (FloatingInput, FloatingSelect, Switch...)
├── lib/i18n/            # conteúdo textual do site (atualmente só pt-BR)
└── styles/globals.css   # @font-face, reset, utilitários de marca
```

Regra geral: nada em `features/` é importado por outra feature diretamente — o compartilhamento passa por `shared/`.

## Design tokens

Cor, tipografia, espaçamento, sombra, motion (duração/easing) e z-index vivem em `src/config/tokens.ts` e são conectados ao Tailwind via `tailwind.config.ts`. Prefira sempre as classes nomeadas (`duration-base`, `z-header`, `ease-reveal`...) a valores arbitrários (`duration-[300ms]`, `z-[40]`) — se um valor que você precisa não existe no token, adicione-o lá em vez de improvisar inline.

## Qualidade

- Type-check estrito via `tsc --noEmit` (rodado automaticamente no `build`).
- Sem `any` na base de código.
- Lint (ESLint) e testes automatizados (Vitest) ainda não configurados — ver auditoria técnica para detalhes e recomendação de setup.
