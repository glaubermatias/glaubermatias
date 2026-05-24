## Diagnóstico

O problema não parece ser um erro de runtime, e sim de modelagem/renderização dos dados: a página de projeto usa vários fallbacks que reaproveitam o mesmo campo em blocos diferentes.

Exemplos encontrados:
- `description` pode aparecer no card, no título de apoio e no TL;DR.
- `overview` é usado como TL;DR e também como `Context` quando `context` não existe.
- `solution` aparece como `Strategy` quando `strategy` não existe.
- Na listagem de Work, `challenge + solution` são combinados automaticamente em um parágrafo de card.
- Alguns campos como `role`, `stakeholders` e `tools` estão semanticamente parecidos, o que facilita o Visual Edits trocar um pelo outro quando o texto é editado por seleção.

Isso cria blocos visualmente diferentes, mas conectados ao mesmo campo de origem. Quando um texto é atualizado em um lugar, outro bloco que usa o mesmo fallback também muda ou volta para conteúdo antigo.

## Plano de correção

1. Separar os campos por função visual
   - Criar campos explícitos para cada bloco da página de projeto, por exemplo:
     - texto curto do card/listagem
     - subtítulo/meaningful title
     - TL;DR do overview
     - contexto
     - problema
     - estratégia
     - trade-offs
     - fechamento
   - Manter `description` apenas como fallback legado, não como fonte compartilhada principal de vários blocos.

2. Remover fallbacks que causam mistura
   - Parar de usar `overview` automaticamente como `Context`.
   - Parar de usar `description` automaticamente como `meaningfulTitle` e `tldr` quando houver campos específicos.
   - Parar de usar `solution` como `Strategy` quando o projeto não tiver estratégia real.
   - Evitar `results.join(' ')` como parágrafo final, porque isso transforma bullets em texto corrido e pode confundir edições.

3. Atualizar a renderização da página de detalhe
   - Renderizar cada seção apenas a partir do seu campo correspondente.
   - Só mostrar uma seção quando o campo dela existir.
   - Garantir que o bloco de Overview, Narrative e Closing não compartilhem a mesma string de dados.

4. Corrigir a listagem de Work
   - Fazer os cards usarem `cardDescription` e/ou um campo específico de resumo de card.
   - Remover a combinação automática `challenge + solution`, que pode fazer textos internos da página aparecerem no card.

5. Normalizar os dados existentes
   - Ajustar os projetos atuais em `projects.ts` para preencher campos independentes onde necessário.
   - Para o projeto Leadership Academy, preservar os textos reais já atualizados e garantir que cada bloco tenha sua própria fonte.

6. Validar a correção
   - Conferir no código que nenhum bloco principal renderiza a mesma string por fallback indevido.
   - Verificar que `description`, `overview`, `context`, `strategy` e `closingParagraph` aparecem em locais independentes.
   - Revisar a página `/leadership-academy` para confirmar que os textos não estão duplicando nem vazando entre seções.

## Resultado esperado

Depois da correção, o Visual Edits/chat terá alvos mais estáveis: editar um texto em um bloco não deverá alterar outro bloco da página, porque cada seção terá uma fonte de conteúdo própria e independente.