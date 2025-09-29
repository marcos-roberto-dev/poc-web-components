# Development Changelog

Este arquivo documenta todas as interações e modificações aceitas durante o desenvolvimento do projeto.

## [28/09/2025] - Configuração React App

### Modificado
- **app/react-app/vite.config.ts**
  - Desabilitado hot reload (HMR) para evitar conflitos com single-spa
  - Adicionada configuração `hmr: false` no servidor Vite
  - **Motivo**: O hot reload pode interferir no carregamento e recarregamento dinâmico dos microfrontends em arquiteturas single-spa
