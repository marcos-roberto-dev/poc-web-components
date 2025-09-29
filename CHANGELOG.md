# Changelog

## [Data: 28/09/2025]

### Correções de Build
- Corrigido o `tsconfig.json` do pacote `vue-library`: alterado `include` de `["lib"]` para `["src"]` e `module` de `"es2015"` para `"es2020"` para suportar imports dinâmicos.
- Criado o diretório `src/` e arquivo `src/index.ts` para o pacote `react-library` com bindings React gerados pelo Stencil.
- Corrigido o `tsconfig.json` do pacote `react-library`: alterado `include` de `["lib"]` para `["src"]` e adicionado `"esModuleInterop": true` para resolver erro de import do React.
- Todos os pacotes agora compilam com sucesso no comando `lerna run build`.
- Atualizado `@types/react` e `@types/react-dom` de versão 17 para 19 no `app/react-app/package.json` para resolver conflito de dependências com `@testing-library/react@16.3.0`.
- Executado `npm install` no diretório `app/react-app` para instalar as dependências atualizadas.

### Atualizações de Dependências
- Atualizado `@types/react` e `@types/react-dom` de versão 17 para 19 no `app/react-app/package.json` para resolver conflito de dependências com `@testing-library/react@16.3.0`.
- Executado `npm install` no diretório `app/react-app` para instalar as dependências atualizadas.
- Adicionado dependências Vite (`vite`, `@vitejs/plugin-vue`, `@vitejs/plugin-react`, `vite-plugin-single-spa`) ao `package.json` raiz para resolver problemas de resolução de módulos em workspaces.

### Migrações
- Migrado `app/vue-app` de Vue CLI para Vite: removido `vue.config.js`, criado `vite.config.ts`, atualizado `package.json` com dependências Vite e `vite-plugin-single-spa`, alterado scripts para usar `vite`.
- Migrado `app/react-app` de Webpack para Vite: criado `vite.config.ts`, atualizado `package.json` com dependências Vite e `vite-plugin-single-spa`, alterado scripts para usar `vite`.
- Apenas `app/root-app` mantém Webpack.
