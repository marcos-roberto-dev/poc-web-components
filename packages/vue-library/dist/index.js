import { defineContainer, defineStencilSSRComponent } from '@stencil/vue-output-target/runtime';
import { defineCustomElement as defineMyComponent } from 'stencil-library/components/my-component.js';
export const MyComponent = globalThis.window ? defineContainer('my-component', defineMyComponent, [
    'first',
    'middle',
    'last'
]) : defineStencilSSRComponent({
    tagName: 'my-component',
    hydrateModule: import('stencil-library/hydrate'),
    props: {
        'first': [String, "first"],
        'middle': [String, "middle"],
        'last': [String, "last"]
    }
});
//# sourceMappingURL=index.js.map