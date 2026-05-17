# Igualar altura do header de CV no mobile

## Diagnóstico

No `PageHeader`, quando existe `rightSlot` e `flushRight` é falso (caso da página CV), o slot é renderizado como uma **segunda coluna empilhada** no mobile, com seu próprio `pt-32 md:pt-36 pb-12 md:pb-16`. Isso soma cerca de 200px de altura extra abaixo do título/subtítulo, deixando o header de CV muito mais alto do que Work (sem rightSlot) e About (rightSlot com `flushRight`, posicionado em absolute).

## Mudança

Em `src/components/PageHeader.tsx`, no bloco do `rightSlot` (não-flush):

- No mobile, render do slot **sem** padding vertical próprio e alinhado ao final da coluna esquerda (sem criar uma nova "linha" de altura).
- No desktop (`md+`), manter o comportamento atual (coluna lateral com seu próprio padding).

Tecnicamente: trocar `pt-32 md:pt-36 pb-12 md:pb-16` por `pt-0 pb-8 md:pt-36 md:pb-16` (ou equivalente) e ajustar `items-end`/`justify-end` para que no mobile o botão fique imediatamente abaixo do subtítulo, dentro da mesma altura mínima de 420px.

Resultado: altura do header de CV no mobile passa a bater com Work e About, e o botão "Read my CV" continua visível.

## Arquivos

- `src/components/PageHeader.tsx`
