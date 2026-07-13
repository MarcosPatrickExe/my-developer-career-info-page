# Marcos Patrick — Case Study (Angular)

Landing page em formato de case study / storytelling por scroll.

## Stack

- **Angular 18** (standalone components, sem NgModules)
- **TypeScript**
- **Tailwind CSS**
- **Three.js** — cena 3D ambiente no hero
- **Motion** (motion.dev) — sucessora agnóstica de framework do Framer
  Motion (Framer Motion em si é exclusivo para React)
- **CMS simples** — conteúdo dos projetos em `src/assets/data/*.json`,
  sem banco de dados nem painel administrativo

## Rodando localmente

Pré-requisitos: Node.js 18+ e npm.

\`\`\`bash
npm install
npm start
\`\`\`

Acesse http://localhost:4200

## Editando o conteúdo (o "CMS")

- `src/assets/data/projects.json` — cada objeto vira um card na timeline
- `src/assets/data/stack.json` — ícones da seção de tecnologias (slugs do
  [simpleicons.org](https://simpleicons.org))

Não é necessário mexer em nenhum componente para adicionar, remover ou
editar um projeto.

## Estrutura

\`\`\`
src/app/
  core/
    models/       interfaces TypeScript (Project, StackIcon)
    services/      ProjectsService (CMS) + ThreeSceneService (hero 3D)
    directives/    ScrollRevealDirective (animações de entrada no scroll)
  features/
    nav/
    hero/
    about/
    timeline/      timeline de case studies + rail lateral animado
    stack/
    contact/
\`\`\`

## Substituindo a foto

Em `src/app/features/hero/hero.component.html` há um comentário indicando
onde trocar o placeholder "MP" pela foto real. Coloque a imagem em
`src/assets/img/` e ajuste o `src`.

## Próximos passos sugeridos

- [ ] Substituir textos de exemplo pelos projetos reais
- [ ] Adicionar foto no hero
- [ ] Páginas de case study individuais (`/projetos/:slug`) com mais detalhe técnico
- [ ] Deploy (Vercel ou Netlify — ambos suportam Angular via build estático)
