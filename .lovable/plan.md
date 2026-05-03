## Por que isso acontece

Em `src/pages/ProjectDetailPage.tsx`:
- A lista de metadados usa `.filter((m) => m.value)` — qualquer campo vazio é descartado.
- O bloco "Trade-offs & Constraints" só renderiza com `{derived.tradeoffs && (...)}`.

Em `src/data/projects.ts`, **nenhum** dos 16 projetos tem `stakeholders`, `tools` ou `tradeoffs` preenchidos. Só `duration` está em todos e `role` cai num fallback genérico ("Lead Designer"). Resultado: só Role e Duration aparecem, e Trade-offs nunca renderiza.

## Plano de correção

Garantir que **todos** os projetos sempre exibam os 4 metadados e o bloco Trade-offs, com conteúdo de qualidade — sem precisar reescrever 16 case studies à mão.

### 1. Fallbacks inteligentes em `ProjectDetailPage.tsx` (`derived`)

Para cada campo faltante, derivar um valor sensato a partir do que já existe no projeto, garantindo que nunca fiquem em branco:

- `role` — manter fallback atual ("Lead Designer").
- `stakeholders` — fallback derivado por `category`:
  - executive-decks → "Executive leadership, C-suite"
  - tech-events → "Engineering leadership, Event ops"
  - hr-initiatives → "People team, Program leads"
  - templates → "Design ops, Internal teams"
  - side-projects → "Self-initiated"
- `tools` — fallback "Figma, Keynote, PowerPoint" (ajustável por categoria de tech-events para incluir "Notion").
- `duration` — já está em todos; manter.
- `tradeoffs` — fallback genérico curto e honesto:
  > "Tight delivery windows meant prioritizing clarity over visual experimentation in some areas; reusable systems were favored over bespoke one-offs to keep the work scalable."

### 2. Sobrescritas reais em projetos-chave (qualidade editorial)

Preencher manualmente `stakeholders`, `tools` e `tradeoffs` nos projetos em destaque (`featured: true` + os mais visitados — Leadership Academy, Pitch Decks, Summit, Templates Library, ALDI, Uberall) com texto específico ao caso, para que esses não usem o fallback.

### 3. Garantia de renderização

Remover o `.filter((m) => m.value)` (não mais necessário, pois fallback garante valor) e remover o gating `{derived.tradeoffs && ...}` para sempre renderizar o bloco. Fontes/layout/grid 30/70 permanecem intactos.

## Arquivos afetados

- `src/data/projects.ts` — adicionar `stakeholders`, `tools`, `tradeoffs` em ~6 projetos featured.
- `src/pages/ProjectDetailPage.tsx` — fallbacks no `derived`, remover filtros condicionais.

Nada de animação, nem layout do header/carrossel/bento muda.
