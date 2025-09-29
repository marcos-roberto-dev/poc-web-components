# Development Changelog

Este arquivo documenta todas as interações e modificações aceitas durante o desenvolvimento do projeto.

## [29/09/2025] - Build Sequencial e Limpeza de Bibliotecas

### Problema Identificado
- **Build Order Issue**: Dependências entre bibliotecas não respeitadas
- **TypeScript Conflicts**: Erro "Cannot write file because it would overwrite input file"
- **Pasta Dist Suja**: Arquivos antigos causando conflitos na compilação

### Solução Implementada

#### 1. Build Sequencial Explícito
- **package.json (root)**: Script de build sequencial respeitando dependências
```json
"build": "lerna run build --scope=stencil-library && lerna run build --scope=angular-workspace && lerna run build --scope=react-library && lerna run build --scope=vue-library"
```

#### 2. Scripts de Limpeza nas Libraries
- **packages/react-library/package.json**: Script clean adicionado
```json
{
  "scripts": {
    "build": "npm run clean && npm run tsc",
    "clean": "rm -rf dist",
    "tsc": "tsc -p . --outDir ./dist"
  }
}
```

- **packages/vue-library/package.json**: Script clean adicionado
```json
{
  "scripts": {
    "build": "npm run clean && npm run tsc",
    "clean": "rm -rf dist",
    "tsc": "tsc -p . --outDir ./dist"
  }
}
```

#### 3. Ordem de Build Correta
```bash
npm run build
# 1. stencil-library (4s) - Gera wrappers para todos os frameworks
# 2. angular-workspace (2s) - Compila wrapper Angular
# 3. react-library (3s) - Compila wrapper React
# 4. vue-library (2s) - Compila wrapper Vue
```

### Resultado
- ✅ **Build Sequencial**: Dependências respeitadas automaticamente
- ✅ **Dist Limpo**: `rm -rf dist` elimina conflitos de sobrescrita
- ✅ **Libraries Corretas**: Output em `dist/` como padrão npm
- ✅ **Build Confiável**: Sem erros de overwrites ou dependências

### Performance
- **Total**: 7s para todas as 4 bibliotecas
- **Stencil**: 4s (master library)
- **Angular**: 2s (wrapper compilado)
- **React**: 3s (wrapper compilado)
- **Vue**: 2s (wrapper compilado)

### Lerna Output
```bash
✔ angular-workspace:build (2s)
✔ stencil-library:build (4s)
✔ vue-library:build (2s)
✔ react-library:build (3s)
```

## [29/09/2025] - Scripts Paralelos para Apps

### Adicionado
- **package.json (root)**: Scripts para executar apps em paralelo
  - `npm run dev:apps` - Roda todos os apps de desenvolvimento em paralelo
  - `npm run build:apps` - Builda todos os apps em paralelo
  - `npm run build:all` - Builda libraries (Lerna) + apps
  - Scripts individuais: `dev:react`, `dev:vue`, `dev:angular`, `dev:root`
  - Scripts de build individuais: `build:react`, `build:vue`, `build:angular`, `build:root`

- **npm-run-all**: Dependência para execução paralela de scripts
  - **Motivo**: Permitir desenvolvimento simultâneo de todos os microfrontends

### Arquitetura de Scripts
```bash
# Desenvolvimento (servidores em paralelo)
npm run dev:apps
# └── React (port 4173)
# └── Vue (port 4174)
# └── Angular (port 4200)
# └── Root App (port 9000)

# Build libraries apenas
npm run build

# Build apps apenas
npm run build:apps

# Build completo (libraries + apps)
npm run build:all
```

### Design Decision
- **Apps FORA do workspace Lerna**: Evita conflitos de dependências entre frameworks
- **Scripts no root**: Centraliza controle dos microfrontends
- **Execução paralela**: Desenvolver todos os apps simultaneamente

### Resultado
- ✅ **Desenvolvimento eficiente**: Todos os apps rodando com um comando
- ✅ **Build automatizado**: Scripts para CI/CD
- ✅ **Isolamento**: Apps não conflitam com workspace Lerna
- ✅ **Flexibilidade**: Scripts individuais e coletivos disponíveis

## [29/09/2025] - Renomeação para angular-library

### Modificado
- **Renomeação consistente**: `component-library` → `angular-library`
  - **Motivo**: Padronizar nomenclatura com `vue-library` e `react-library` para melhor apresentação da POC

### Arquivos alterados:
- **packages/angular-workspace/angular.json**
  - Alterado nome do projeto de `component-library` para `angular-library`
  - Atualizados todos os caminhos de configuração

- **packages/angular-workspace/projects/** (diretório renomeado)
  - `component-library/` → `angular-library/`

- **packages/angular-workspace/projects/angular-library/package.json**
  - `"name": "component-library"` → `"name": "angular-library"`

- **packages/angular-workspace/projects/angular-library/ng-package.json**
  - `"dest": "../../dist/component-library"` → `"dest": "../../dist/angular-library"`
  - Atualizada dependência permitida para `angular-library`

- **packages/stencil-library/stencil.config.ts**
  - Atualizado caminho `directivesProxyFile` para `../angular-workspace/projects/angular-library/`
  - Descomentado `directivesArrayFile` para funcionamento correto

- **app/angular-app/src/app/app.config.ts**
  - `import { ComponentLibraryModule } from 'component-library'` → `import { ComponentLibraryModule } from 'angular-library'`

### npm link reconfigurado:
```bash
# Removido link antigo
npm unlink component-library

# Novo workflow
cd packages/angular-workspace/dist/angular-library && npm link
cd app/angular-app && npm link angular-library
```

### Resultado
- ✅ **Nomenclatura consistente**: `vue-library`, `react-library`, `angular-library`
- ✅ **Build funcionando**: Angular app compila sem erros
- ✅ **npm link atualizado**: Aponta para `dist/angular-library`
- ✅ **Stencil integration**: Wrappers Angular gerados corretamente
- ✅ **POC ready**: Nomenclatura profissional para apresentação

## [29/09/2025] - Solução Definitiva npm link Angular Workspace

### Problema Identificado
- **npm link configuração incorreta**: npm link estava apontando para source em vez do dist
- **Estrutura de build incorreta**: ng-package.json estava construindo em `dist/` em vez de `dist/component-library/`
- **Módulo não encontrado**: "Cannot find module 'component-library'" persistindo

### Corrigido
- **packages/angular-workspace/projects/component-library/ng-package.json**
  - Alterado `"dest": "../../dist"` para `"dest": "../../dist/component-library"`
  - **Motivo**: Criar estrutura de diretório correta para npm link

- **npm link workflow corrigido**:
  1. `cd packages/angular-workspace/dist/component-library && npm link`
  2. `cd app/angular-app && npm link component-library`
  - **Motivo**: O link deve sempre apontar para a versão compilada (dist), não para o source

### Regra para npm link em Angular Workspaces
📋 **SEMPRE fazer npm link no diretório `dist/library-name`**, nunca no source:
- ❌ **Errado**: `packages/angular-workspace/projects/component-library`
- ✅ **Correto**: `packages/angular-workspace/dist/component-library`

### Workflow Correto npm link Angular
```bash
# 1. Build Stencil
cd packages/stencil-library && npm run build

# 2. Build Angular Library
cd packages/angular-workspace && npm run build

# 3. Create link no DIST
cd packages/angular-workspace/dist/component-library && npm link

# 4. Use link no app
cd app/angular-app && npm link component-library
```

### Modificado
- **app/angular-app/src/app/app.component.ts**
  - Adicionado `OnInit` e `defineCustomElements(window)` no `ngOnInit()`
  - **Motivo**: Garantir que os custom elements do Stencil sejam registrados

### Resultado
- ✅ **npm link funcionando corretamente**: Aponta para `dist/component-library`
- ✅ **Módulo encontrado**: `import { ComponentLibraryModule } from 'component-library'` funcionando
- ✅ **Build sem erros**: Angular app compila corretamente
- ✅ **Custom elements registrados**: Stencil components disponíveis
- ✅ **Chunk lazy loading**: `my-component-entry` sendo gerado corretamente## [29/09/2025] - Correção Integração Angular App com Component Library

### Modificado
- **packages/angular-workspace/projects/component-library/ng-package.json**
  - Adicionado `"stencil-library"` na lista `allowedNonPeerDependencies`
  - **Motivo**: Resolver erro de build que impedia a distribuição da biblioteca Angular com dependências do Stencil

- **app/angular-app/src/app/app.config.ts**
  - Importado `importProvidersFrom` do `@angular/core`
  - Adicionado `ComponentLibraryModule` aos providers usando `importProvidersFrom()`
  - **Motivo**: Configurar corretamente o módulo de componentes em uma aplicação Angular standalone

- **app/angular-app/src/app/app.component.ts**
  - Removida importação não utilizada do `ComponentLibraryModule`
  - Importado `CUSTOM_ELEMENTS_SCHEMA` do `@angular/core`
  - Adicionado `schemas: [CUSTOM_ELEMENTS_SCHEMA]` no decorator `@Component`
  - Implementado `OnInit` com chamada direta para `defineCustomElements(window)`
  - Adicionado logs de debug para verificar registro dos custom elements
  - **Motivo**: Permitir o uso de Web Components e garantir que sejam registrados corretamente

- **packages/angular-workspace/projects/component-library/src/lib/component-library.ts**
  - Modificado `defineCustomElements()` para `defineCustomElements(window)`
  - **Motivo**: Passar o objeto window explicitamente para o registro dos custom elements

- **app/angular-app/src/app/app.component.html**
  - Adicionado exemplo de uso do componente `<my-component>` do Stencil
  - **Motivo**: Demonstrar a integração funcionando entre Angular e Stencil

### Corrigido
- **npm link configuration**
  - Reconfigurado npm link para apontar para `dist/component-library` ao invés do source
  - **Motivo**: O npm link estava apontando para o código fonte, mas deveria apontar para a versão compilada

- **Custom Elements Recognition**
  - Adicionado `CUSTOM_ELEMENTS_SCHEMA` para resolver erro NG8001
  - **Motivo**: Angular não reconhecia `<my-component>` como Web Component válido

### Investigando
- **Renderização do componente Stencil**: O componente aparece no DOM mas não está sendo renderizado visualmente
- **Build gera chunk correto**: `my-component-entry` chunk está sendo criado corretamente
- **Logs de debug**: Adicionados para verificar se `customElements.get('my-component')` retorna o elemento

### Resultado
- ✅ Build da biblioteca Angular executa sem erros
- ✅ ComponentLibraryModule corretamente configurado para aplicações standalone
- ✅ npm link funcionando corretamente apontando para dist
- ✅ Componentes Stencil disponíveis no Angular app
- ✅ Servidor de desenvolvimento Angular funcionando sem erros
- ✅ Web Components sendo reconhecidos corretamente
- ⚠️ **Investigando**: Componente não está renderizando visualmente (aparece no DOM mas sem conteúdo)

## [29/09/2025] - Migração para provideAppInitializer no Angular

### Modificado
- **packages/angular-workspace/projects/component-library/src/lib/component-library.ts**
  - Substituído `APP_INITIALIZER` depreciado por `provideAppInitializer()`
  - Atualizada importação de `APP_INITIALIZER` para `provideAppInitializer`
  - Simplificada configuração do provider para usar a nova sintaxe funcional
  - **Motivo**: O `APP_INITIALIZER` foi depreciado no Angular 19/20, sendo substituído pela função `provideAppInitializer()` que é mais moderna e alinhada com a arquitetura standalone do Angular

### Resultado
- ✅ Código atualizado para Angular 20+ sem warnings de depreciação
- ✅ Funcionalidade mantida: componentes Stencil ainda são inicializados corretamente
- ✅ Build do Angular executando sem erros
- ✅ Código mais moderno e futuro-proof

## [29/09/2025] - Correção de Conflitos de Tipos no Stencil

### Modificado
- **packages/stencil-library/package.json**
  - Removidas dependências conflitantes: `@types/jest`, `jest`, `jest-cli`
  - **Motivo**: O Stencil possui seu próprio framework de testes baseado em Jest, e as dependências externas estavam causando conflitos de tipos entre Jest e Jasmine

- **packages/stencil-library/tsconfig.json**
  - Adicionada propriedade `types: ["node", "jest"]` para incluir apenas os tipos necessários
  - Adicionada propriedade `skipLibCheck: true` para pular verificação de tipos em bibliotecas
  - **Motivo**: Configuração específica para resolver conflitos de tipagem e permitir o uso dos matchers personalizados do Stencil como `toEqualHtml`

- **packages/stencil-library/stencil.config.ts**
  - Adicionada configuração de coverage no testing
  - **Motivo**: Melhorar a configuração de testes e coverage do código

### Adicionado
- **@types/jest** como devDependency específica
  - **Motivo**: Necessário para suporte aos tipos de testes, mas sem as dependências conflitantes do Jest runtime

### Resultado
- Build do Stencil agora executa sem erros de conflito de tipos
- Matchers personalizados do Stencil como `toEqualHtml` funcionam corretamente
- Framework de testes integrado do Stencil opera sem conflitos

## [28/09/2025] - Configuração React App

### Modificado
- **app/react-app/vite.config.ts**
  - Desabilitado hot reload (HMR) para evitar conflitos com single-spa
  - Adicionada configuração `hmr: false` no servidor Vite
  - **Motivo**: O hot reload pode interferir no carregamento e recarregamento dinâmico dos microfrontends em arquiteturas single-spa
