## Ajuste

Reduzir o padding superior do lightbox para algo intermediário entre o original (`pt-36 md:pt-44`) e o atual exagerado (`pt-52 md:pt-64`).

Arquivo: `src/pages/ProjectDetailPage.tsx`, linha 112.

- `pt-52 md:pt-64` → `pt-40 md:pt-52`
- `pb-28 md:pb-40` mantido
- Largura volta levemente: `max-w-[1180px]` → `max-w-[1240px]`, `px-6 md:px-14 lg:px-20` → `px-5 md:px-12 lg:px-16` (acompanha a redução do topo, mantendo 16:9 confortável).
