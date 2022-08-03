# NextJS Layout Component

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

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
