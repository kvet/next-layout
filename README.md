# NextJS Layout Component

![npm](https://img.shields.io/npm/v/@kvet/next-layout)
![npm bundle size](https://img.shields.io/bundlephobia/min/@kvet/next-layout)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@kvet/next-layout/peer/next)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@kvet/next-layout/peer/react)
![NPM](https://img.shields.io/npm/l/@kvet/next-layout)

The simple and powerful NextJS layout solution

## Motivation

NextJS lacks layouting solution for a long time. And however the NextJS team intruduced Layouts RFC, we still need a solution right now. Introducing my vision of simple and powerfull NextJS layout component.

The idea is pretty simple. And it was already described here: https://nextjs.org/docs/basic-features/layouts. But there is one problem. It is not so useful without hooks in layout. Hooks can be used to fetch data, check validity of route queries and so on. Also, it allows to trully decouple layout components.

Please check the demo: https://next-layout-taupe.vercel.app/

## Basic usage

### Installation

```bash
# npm
npm i @kvet/next-layout

# yarn
yarn add @kvet/next-layout
```

### Add the layout component to a custom '_app.tsx' file

```tsx
// pages/_app.tsx

import { AppPropsWithLayout, Layout } from "@kvet/next-layout";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return <Layout pageComponent={Component} pageProps={pageProps} />;
}
```

### Adopt layouts for pages

```tsx
// pages/index.tsx

import { pageComponentWithLayout } from "@kvet/next-layout";
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Layout from "../components/Layout";

export default pageComponentWithLayout(
  function Page() {
    return <main>This is the page component</main>;
  },
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    // Data loading simulation
    const [pathParts, setPathParts] = mountHook(() =>
      useState<{ title: string; path: string }[]>([])
    );
    mountHook(() =>
      useEffect(() => {
        setTimeout(() => {
          setPathParts([{ title: "Main", path: "/" }]);
        }, 1000);
      }, [])
    );

    return (
      <Layout key="layout">
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
```

NOTE:
- It is required to wrap any React hook usage with a `mountHook` wrapper
- It is recommended to specify React keys for significant parts of layout to prevent re-render.

## Error handling

The lib allows to intercept route params and show custom errors.

```tsx
// pages/with-error.tsx

import { pageComponentWithLayout } from "@kvet/next-layout";
import Layout from "../components/Layout";
import Error from "next/error";

export default pageComponentWithLayout(
  function Page() {
    return <main>This is the page component</main>;
  },
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const router = mountHook(() => useRouter());

    if (!router.isReady) {
      return null;
    }

    if (router.query["show_error"]) {
      return (
        <Error statusCode={404} />
      );
    }

    return (
      <Layout key="layout">
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
```

### Route params parsing and validation

With the error handling approach described above, it is also possible to parse and validate route params. Check the example:

```tsx
// pages/with-param-validation/[id].tsx

import { pageComponentWithLayout } from "@kvet/next-layout";
import Layout from "../components/Layout";
import Error from "next/error";

type PageProps = { id: number }; // Page component props
type GlobalPageProps = {}; // Global page props received from the '_app.tsx'

function isPositiveInteger(value: string): boolean {
  return /^\d+$/.test(value);
}

function safeParsePositiveIntegerParam(
  param: string | readonly string[] | undefined
): number | undefined {
  if (!param || typeof param !== "string" || !isPositiveInteger(param)) {
    return undefined;
  }
  const parsedValue = parseInt(param, 10);
  return parsedValue !== 0 ? parsedValue : undefined;
}

export default pageComponentWithLayout<PageProps, GlobalPageProps>(
  function Page({ id }) {
    return <main>This is the page component with the id '{id}'</main>;
  },
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const router = mountHook(() => useRouter());

    if (!router.isReady) {
      return null;
    }

    const id = safeParsePositiveIntegerParam(router.query.id);
    if (id === undefined) {
      return (
        <Error statusCode={404} />
      );
    }

    return (
      <Layout key="layout">
        <PageComponent {...pageProps} id={id} />
      </Layout>
    );
  }
);
```

There are the following parsers available:

- `safeParseStringParam(router.query[key])` - ensures that the passed query param is a string
- `safeParsePositiveIntegerParam(router.query[key])` - ensures that the passed query param is a positive integer

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
