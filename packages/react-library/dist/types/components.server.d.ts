import type { StencilReactComponent } from '@stencil/react-output-target/runtime';
import { type SerializeShadowRootOptions } from '@stencil/react-output-target/ssr';
import { MyComponent as MyComponentElement } from "stencil-library/components/my-component.js";
export declare const serializeShadowRoot: SerializeShadowRootOptions;
export type MyComponentEvents = NonNullable<unknown>;
export declare const MyComponent: StencilReactComponent<MyComponentElement, MyComponentEvents>;
