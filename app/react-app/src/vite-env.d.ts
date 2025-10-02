/// <reference types="vite/client" />

// Declarações para Vite + React Refresh
declare global {
  interface Window {
    __vite_plugin_react_preamble_installed__?: boolean;
    $RefreshReg$?: (type: any, id: string) => void;
    $RefreshSig$?: () => (type: any) => any;
  }

  // Para dependências que precisam de global
  var global: typeof globalThis;
}

// Declarações de módulos internos do Vite
declare module '/@vite/client' {
  const client: any;
  export default client;
}

declare module '/@react-refresh' {
  const RefreshRuntime: {
    injectIntoGlobalHook: (window: any) => void;
  };
  export default RefreshRuntime;
}

export {};
