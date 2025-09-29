import { Config } from '@stencil/core';

import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

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
  },
};
