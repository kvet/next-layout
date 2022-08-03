import { pageComponentWithLayout } from "@kvet/next-layout";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Highlight from "../../components/Highlight";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default pageComponentWithLayout(
  memo(function Page() {
    return (
      <main className="py-8 prose mx-auto max-w-4xl">
        <h1>The page with a sidebar</h1>
        <p>Here is used the layout with sidebar.</p>
        <Highlight>
          {`
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    // Data loading simulation
    const [pathParts, setPathParts] = mountHook(() =>
    useState<{ title: string; path: string }[]>([])
  );
  const [paths, setPaths] = mountHook(() =>
    useState<{ title: string; path: string }[]>([])
  );
    mountHook(() =>
      useEffect(() => {
        setTimeout(() => {
          setPathParts([
            { title: "Main", path: "/" },
            { title: "Page with a sidebar", path: "/sidebar" },
          ]);
          setPaths([
            { title: "Page with a sidebar", path: "/sidebar" },
            { title: "Nested page with a fullscreen layout", path: "/sidebar/fullscreen" },
          ]);
        }, 1000);
      }, [])
    );

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <Sidebar key="sidebar" paths={paths}>
          <PageComponent {...pageProps} />
        </Sidebar>
      </Layout>
    );
  }
          `}
        </Highlight>
        <p>
          Check the nested page:{" "}
          <Link href="/sidebar/fullscreen">
            <a>Page with a fullscreen layout</a>
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
  const [paths, setPaths] = mountHook(() =>
    useState<{ title: string; path: string }[]>([])
  );
    mountHook(() =>
      useEffect(() => {
        setTimeout(() => {
          setPathParts([
            { title: "Main", path: "/" },
            { title: "Page with a sidebar", path: "/sidebar" },
          ]);
          setPaths([
            { title: "Page with a sidebar", path: "/sidebar" },
            { title: "Nested page with a fullscreen layout", path: "/sidebar/fullscreen" },
          ]);
        }, 1000);
      }, [])
    );

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <Sidebar key="sidebar" paths={paths}>
          <PageComponent {...pageProps} />
        </Sidebar>
      </Layout>
    );
  }
);
