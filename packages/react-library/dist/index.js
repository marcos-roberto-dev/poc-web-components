'use client';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "stencil-library/components/my-component.js";
export * from './components.js';
export var MyComponent = /*@__PURE__*/ createComponent({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    // @ts-ignore - ignore potential React type mismatches between the Stencil Output Target and your project.
    react: React,
    events: {},
    defineCustomElement: defineMyComponent
});
