# Flowersechs Library

Biblioteca de livros com o visual da Steam. Feita só com HTML, CSS e JavaScript puro, sem build e sem dependências.

## Abas

- **Biblioteca**: os livros que você já tem, com coleções, progresso de leitura, conquistas e notas.
- **Loja**: catálogo para descobrir livros. "Adicionar à biblioteca" move o livro para a aba Biblioteca na coleção "Quero ler". Também há lista de desejos.

## Estrutura

```
index.html      estrutura da página
css/style.css   visual (tema escuro e claro, segue o sistema)
js/app.js       lógica: coleções, busca, progresso, conquistas, adicionar livro
```

## Como rodar

Abra o `index.html` no navegador, ou use a extensão Live Server no VS Code.

## Onde ficam os dados

Tudo é salvo no `localStorage` do navegador (chave `flowersechs-library-v1`). Os 14 livros que aparecem na primeira vez são exemplos, marcados como "Exemplo". Para começar do zero, apague os livros ou limpe os dados do site.

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos.
2. Em Settings > Pages, escolha a branch `main` e a pasta `/ (root)`.
3. A biblioteca fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

As fontes (Fraunces, Hanken Grotesk e Oswald) vêm do Google Fonts. Sem internet, o navegador usa fontes parecidas do sistema.
