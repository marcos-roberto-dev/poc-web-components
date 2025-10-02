import { Config } from '@stencil/core';

import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
// import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  taskQueue: 'async',
  outputTargets: [
    reactOutputTarget({
      outDir: '../react-library/src',
      hydrateModule: 'stencil-library/hydrate',
      clientModule: 'react-library',
    }),
    vueOutputTarget({
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      componentCorePackage: 'stencil-library',
      hydrateModule: 'stencil-library/hydrate',
      proxiesFile: '../vue-library/src/index.ts',
    }),
    // Angular Output Target para Standalone Components (usando custom elements)
    // angularOutputTarget({
    //   componentCorePackage: 'stencil-library',
    //   customElementsDir: 'components',
    //   outputType: 'standalone',
    //   directivesProxyFile: '../angular-workspace/projects/angular-library/src/lib/stencil-generated/components.ts',
    //   directivesArrayFile: '../angular-workspace/projects/angular-library/src/lib/stencil-generated/index.ts',
    //   valueAccessorConfigs: []
    // }),
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      dir: 'components'
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "shell",
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.spec.ts',
      '!src/**/*.e2e.ts'
    ]
  },
};
