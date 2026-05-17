## Problem

No mobile, o carrossel de palavras do Hero está cortando palavras maiores (ex: "presentations", "internal comms", "pitch decks"). Duas causas combinadas em `src/components/Hero.tsx`:

1. O `<span>` que envolve o carrossel tem `height: 1.2em` + `overflow: hidden` (necessário para a animação de slide). Isso corta descendentes (p, g) verticalmente.
2. A palavra ativa é posicionada com `absolute … left-1/2 -translate-x-1/2` dentro de um spacer invisível com a largura da palavra mais longa ("presentations"). Em telas estreitas, esse spacer pode ser mais largo que a linha disponível, causando quebra ruim e a sensação de corte horizontal.

## Fix (apenas mobile)

Editar somente `src/components/Hero.tsx`:

1. Renderizar o bloco do carrossel como **`block` centralizado em mobile** e `inline-flex` em md+:
   - Em mobile: o `<Link>` do carrossel passa a ocupar uma linha própria abaixo do texto "amplify the impact of", centralizado, com largura igual à largura da palavra mais longa (sem ultrapassar a viewport).
   - Em md+: mantém o comportamento atual inline com o resto da frase.

2. Aumentar a altura do clipping para não cortar descendentes:
   - Trocar `height: 1.2em` por `height: 1.45em` (e o spacer e o `<motion.span>` correspondentes) somente onde necessário. Mantém `overflow: hidden` para que a animação de slide continue funcionando, mas com folga vertical suficiente para "p", "g".

3. Garantir que o spacer (palavra mais larga) tenha `max-width: 100%` em mobile para nunca ultrapassar a largura disponível, e que a frase anterior ("...amplify the impact of") não force quebra estranha.

4. Em mobile, remover o `\u00A0` final após "of" quando o carrossel vai para linha separada, para evitar espaço extra visual.

## Resultado esperado

- Mobile: "Designer of visual stories that amplify the impact of" em uma/duas linhas, e logo abaixo, centralizado, a palavra do carrossel aparecendo por completo (sem corte de topo/base e sem corte lateral), alternando suavemente.
- Desktop (md+): inalterado.

## Arquivos

- `src/components/Hero.tsx` — única alteração.
