/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer, defineStencilSSRComponent, type StencilVueComponent } from '@stencil/vue-output-target/runtime';

import type { JSX } from 'stencil-library';

import { defineCustomElement as defineMyComponent } from 'stencil-library/components/my-component.js';


export const MyComponent: StencilVueComponent<JSX.MyComponent> = /*@__PURE__*/ globalThis.window ? defineContainer<JSX.MyComponent>('my-component', defineMyComponent, [
  'first',
  'middle',
  'last'
]) : defineStencilSSRComponent<JSX.MyComponent>({
  tagName: 'my-component',
  hydrateModule: import('stencil-library/hydrate'),
  props: {
    'first': [String, "first"],
    'middle': [String, "middle"],
    'last': [String, "last"]
  }
});

