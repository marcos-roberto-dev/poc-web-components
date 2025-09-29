import { NgModule, provideAppInitializer } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from 'stencil-library/loader';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    provideAppInitializer(() => {
      return defineCustomElements(window);
    })
  ]
})
export class ComponentLibraryModule {}
