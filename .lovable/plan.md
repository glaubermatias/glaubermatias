

# Plano: Criar Página /work e Páginas de Detalhes para Cada Projeto

## Resumo

Este plano implementará uma nova página `/work` para listar todos os projetos e criará páginas individuais de detalhes para cada um dos 15 projetos, organizados nas 5 categorias fornecidas.

---

## Estrutura de Projetos a Criar

| Categoria | Projeto | Rota |
|-----------|---------|------|
| Executive decks | Leadership Academy | `/leadership-academy` |
| Executive decks | Pitch decks | `/pitch-decks` |
| Executive decks | All Hands & Leadership Meetings | `/all-hands-and-leadership-meetings` |
| Executive decks | Summit | `/summit` |
| Templates | Templates library | `/templates-library` |
| Templates | Presentation templates | `/presentation-templates` |
| Templates | Presentation masterclasses | `/presentation-masterclasses` |
| Tech events | Tech meetups | `/tech-meetups` |
| Tech events | Tech conference | `/tech-conference` |
| HR initiatives | Brilliant Youth | `/tech-interns-onboarding` |
| HR initiatives | P&T external newsletter | `/tech-newsletter` |
| Side projects | ALDI case study | `/ALDI-case-study` |
| Side projects | Uberall dashboard | `/Uberall-dashboard` |
| Side projects | Graphic design project | `/booklet` |
| Side projects | NY trip itinerary | `/ny-trip-itinerary` |

---

## Etapas de Implementação

### Etapa 1: Criar Arquivo de Dados Centralizado

Criar um novo arquivo `src/data/projects.ts` com todos os projetos e seus detalhes:

- Definir interface `ProjectData` com campos para:
  - `id` (slug da URL)
  - `title` (nome do projeto)
  - `category` (categoria)
  - `description` (descrição curta)
  - `images` (array de imagens do carrossel)
  - `year`, `client`
  - Detalhes expandidos: `overview`, `challenge`, `solution`, `results`
  
- Exportar array com os 15 projetos com dados placeholder (imagens do Unsplash)

### Etapa 2: Renomear Rota /projects para /work

Atualizar o arquivo `src/App.tsx`:

```text
Mudanças:
- Adicionar import do novo componente WorkPage
- Mudar rota "/projects" para "/work"
- Adicionar rota dinâmica "/:projectId" para páginas de detalhes
```

### Etapa 3: Criar Página /work (WorkPage.tsx)

Criar `src/pages/WorkPage.tsx`:

- Seguir o layout existente de `ProjectsPage.tsx`
- Usar os dados do arquivo centralizado
- Manter os filtros por categoria
- Atualizar os links dos cards para usar as novas rotas (ex: `/leadership-academy`)

### Etapa 4: Criar Componente de Página de Detalhes (ProjectDetailPage.tsx)

Criar `src/pages/ProjectDetailPage.tsx`:

- Usar `useParams()` para capturar o ID do projeto da URL
- Buscar dados do projeto no arquivo centralizado
- Layout seguindo o padrão de `CaseStudyDetail.tsx`:
  - Imagem hero
  - Seção "Overview"
  - Seção "Challenge"
  - Seção "Solution"
  - Galeria de imagens
  - Seção "Other projects" (projetos relacionados da mesma categoria)
- Botão de voltar para `/work`

### Etapa 5: Atualizar Links nos Componentes Existentes

**Arquivo `src/components/WorkSection.tsx`:**
- Mudar link "View all my projects" de `/projects` para `/work`

**Arquivo `src/components/ProjectCard.tsx`:**
- Atualizar href de `/project/${project.id}` para `/${project.id}` (slug direto)

### Etapa 6: Atualizar Rotas no App.tsx

Adicionar as novas rotas:

```text
<Route path="/work" element={<WorkPage />} />
<Route path="/:projectId" element={<ProjectDetailPage />} />
```

---

## Estrutura de Arquivos

```text
src/
├── data/
│   └── projects.ts          # Novo: dados centralizados
├── pages/
│   ├── WorkPage.tsx          # Novo: página /work
│   └── ProjectDetailPage.tsx # Novo: página de detalhes
├── components/
│   ├── WorkSection.tsx       # Atualizar link
│   └── ProjectCard.tsx       # Atualizar href
└── App.tsx                   # Adicionar novas rotas
```

---

## Detalhes Técnicos

### Roteamento Dinâmico

As rotas serão configuradas para que URLs como `/leadership-academy` correspondam diretamente ao `id` do projeto no array de dados.

### Validação de Projeto

Se um usuário acessar uma URL inválida (ex: `/projeto-inexistente`), a página mostrará uma mensagem de "Projeto não encontrado" com link para voltar à página `/work`.

### Responsividade

Todas as páginas seguirão o padrão responsivo existente no site, usando:
- Grid de 1 coluna em mobile
- Grid de 2 colunas em tablet
- Grid de 3 colunas em desktop

---

## Próximos Passos Após Aprovação

1. Criar o arquivo de dados centralizado com os 15 projetos
2. Criar a página WorkPage
3. Criar a página ProjectDetailPage
4. Atualizar rotas no App.tsx
5. Atualizar links nos componentes existentes
6. Testar navegação completa

---

## Nota

Os conteúdos das páginas de detalhes (overview, challenge, solution, results) serão preenchidos com textos placeholder inicialmente. Você poderá me fornecer os textos reais de cada projeto posteriormente para eu atualizar.

