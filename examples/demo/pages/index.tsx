import { pageComponentWithLayout } from "@kvet/next-layout";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Highlight from "../components/Highlight";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default pageComponentWithLayout(
  memo(function Page() {
    return (
      <main className="py-8 prose mx-auto max-w-4xl">
        <h1>The main page</h1>
        <p>Here is used the simplest layout.</p>
        <Highlight>
          {`
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
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
          `}
        </Highlight>
        <p>
          You may notice that I am using the key property. It is needed to help
          React determine which part of the layout is added or removed without
          the need to re-render it.{" "}
          <a
            href="https://www.google.com/search?q=react+key+prop+definition"
            target="_blank"
          >
            I'll google for you.
          </a>
        </p>
        <p>
          Check the page with sidebar that has nested fullscreen route:{" "}
          <Link href="/sidebar">
            <a>Page with a sidebar</a>
          </Link>
        </p>
      </main>
    );
  }),
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
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
