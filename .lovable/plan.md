## Diagnóstico

O bug ainda existe porque a correção anterior removeu alguns fallbacks, mas não eliminou todas as fontes compartilhadas. Hoje ainda há campos com dupla função:

- `project.title` aparece no header e também no seletor do bento grid.
- `meaningfulTitle` ainda cai em `cardDescription`, então um texto de card pode preencher o título significativo.
- `tldr` ainda cai em `overview`, então o bloco de TL;DR pode compartilhar texto com outro campo legado.
- `role`, `stakeholders`, `tools` e `duration` ainda usam defaults por categoria quando faltam dados, o que permite textos genéricos aparecerem no lugar de textos reais.
- Os cards ainda usam `title`, `cardDescription` e `description`, quando o comportamento desejado agora é: cards devem puxar somente o título significativo e o TL;DR da página do projeto.
- A página esconde seções vazias, mas o comportamento desejado é manter todos os blocos estruturais visíveis por padrão.

## Solução definitiva

### 1. Criar uma fonte de verdade explícita para a página de projeto

Vou reorganizar o modelo de dados para separar, por função visual, todos os textos que aparecem na página:

- `headerTitle`
- `tagline` / metadados do topo
- `meaningfulTitle`
- `tldr`
- `metadata`: role, stakeholders, tools, duration
- `bigNumbers`
- `context`
- `problem`
- `strategy`
- `tradeoffs`
- `closingParagraph`
- `galleryLabel` para o bento grid, separado do título do header

O ponto central: cada bloco visual vai ler apenas o seu próprio campo. Nada de `|| cardDescription`, `|| overview`, `|| description`, `|| category default` para texto editorial.

### 2. Migrar os dados existentes para campos independentes

Vou normalizar `src/data/projects.ts` para que todos os projetos tenham os campos explícitos acima preenchidos. Isso preserva os blocos em todas as páginas, sem depender de fallbacks automáticos.

Para o projeto atual:

- `headerTitle`: `Leadership Academy`
- `meaningfulTitle`: `High Performance Teams` ou o texto significativo que já estiver definido como subtítulo visual
- `tldr`: texto resumido da página
- `galleryLabel`: um texto próprio para o bento, sem reutilizar o título do header automaticamente

Assim, se você alterar `headerTitle`, o bento não muda junto. Se alterar `galleryLabel`, o header não muda junto.

### 3. Ajustar a página de detalhe para renderizar blocos fixos

Em `ProjectDetailPage.tsx`, vou remover a renderização condicional dos blocos editoriais principais. A página sempre renderizará:

- Header
- Taglines
- Título significativo
- TL;DR
- Metadados e big numbers
- Context
- Problem
- Strategy
- Trade-offs & Constraints
- Texto final de conclusão

Se algum campo estiver vazio em algum projeto futuro, o bloco continua existindo estruturalmente, mas sem puxar texto de outro lugar.

### 4. Corrigir cards da landing e da página Work

Vou atualizar os cards para seguirem sua regra:

- O título do card vem de `meaningfulTitle`.
- O parágrafo do card vem de `tldr`.
- O card não usa mais `description`, `cardDescription`, `challenge`, `solution` ou `title` como fallback editorial.

Assim, o conteúdo da página do projeto vira a fonte da verdade também para a landing e para `/work`.

### 5. Remover defaults editoriais por categoria

Vou manter defaults seguros apenas para imagens/layout quando necessário. Para textos, vou remover defaults como:

- `Executive leadership, C-suite`
- `Figma, Keynote, PowerPoint`
- `Lead Designer`
- `—`

Esses valores devem vir do projeto, não da categoria.

### 6. Validar no código

Depois da implementação, vou verificar que:

- `headerTitle`, `meaningfulTitle`, `tldr`, `context`, `problem`, `strategy`, `tradeoffs` e `closingParagraph` não usam fallbacks entre si.
- O bento grid não usa mais `project.title` como label padrão editorial.
- Os cards usam apenas `meaningfulTitle` e `tldr` para conteúdo textual principal.
- Todos os blocos principais da página continuam renderizados por padrão.

## Resultado esperado

Editar o header para `Leadership Academy` não poderá mais alterar o bento, card, categoria, TL;DR ou qualquer outro bloco. Cada texto terá uma fonte independente, e o único conteúdo intencionalmente repetido entre página e cards será o TL;DR, junto com o título significativo conforme solicitado.