## Objetivo

No lightbox que abre ao clicar em uma imagem do bento grid (página de cada projeto), aumentar o espaço entre o título/contador no topo e a borda superior da foto, mantendo o padding inferior atual. Como a foto tem proporção fixa 16:9, reduzir a largura útil para acomodar o novo respiro vertical é aceitável.

## Mudanças

Arquivo: `src/pages/ProjectDetailPage.tsx` (componente Lightbox, ~linha 112)

1. **Aumentar `pt`** do container interno do lightbox de `pt-36 md:pt-44` para algo como `pt-52 md:pt-64`, abrindo respiro entre a top bar (título + contador "x / y") e o topo da foto.
2. **Manter `pb-28 md:pb-40`** (padding inferior inalterado, conforme solicitado).
3. **Ajustar largura** para preservar 16:9 sem estourar verticalmente em telas menores: reduzir `max-w-[1320px]` para `max-w-[1180px]` e/ou aumentar levemente `px` lateral (ex: `px-6 md:px-14 lg:px-20`). Isso garante que, com o novo `pt`, a imagem 16:9 ainda caiba na viewport.
4. **Top bar permanece** com `pt-6 pb-4` como hoje — só a foto desce.

## Resultado esperado

- Título do projeto e contador ficam visivelmente afastados do topo da foto.
- Padding inferior da foto permanece como está hoje.
- Foto continua 16:9, apenas um pouco mais estreita em telas grandes.
- Sem alterações em nenhuma outra parte da página.
