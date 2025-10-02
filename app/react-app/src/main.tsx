import React, { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';
import { cssLifecycleFactory } from 'vite-plugin-single-spa/ex';
import { createRoot } from 'react-dom/client';

const lc = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: App,
    errorBoundary(err: any, _info: any, _props: any) {
        return <div>Error: {err}</div>
    }
});

// IMPORTANT:  The argument passed here depends on the file name.
const cssLc = cssLifecycleFactory('spa');

const mountReact = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (import.meta.env.MODE === 'development') {
  mountReact();
}


export const bootstrap = [cssLc.bootstrap, lc.bootstrap];
export const mount = [cssLc.mount, lc.mount];
export const unmount = [cssLc.unmount, lc.unmount];
