import { pageComponentWithLayout } from "@kvet/next-layout";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Highlight from "../../../components/Highlight";
import Layout from "../../../components/Layout";

export default pageComponentWithLayout(
  memo(function Page() {
    return (
      <main className="py-8 prose mx-auto max-w-4xl">
        <h1>The deep nested page with fullscreen layout</h1>
        <p>Even if the page is nested, we can omit parent layout parts.</p>
        <Highlight>
          {`
export default pageComponentWithLayout(
  function Page() { /* ... */ },
  function PageLayout({ PageComponent, pageProps }) {
    // Data loading simulation
    const [pathParts, setPathParts] = useState<
      { title: string; path: string }[]
    >([]);
    useEffect(() => {
      setTimeout(() => {
        setPathParts([
          { title: "Main", path: "/" },
          { title: "Page with a sidebar", path: "/sidebar" },
          {
            title: "Nested page with a fullscreen layout",
            path: "/sidebar/fullscreen",
          },
        ]);
      }, 1000);
    }, []);

    return (
      <Layout key="layout">
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
          `}
        </Highlight>
        <p>
          Check the page with sidebar that has nested fullscreen route:{" "}
          <Link href="/sidebar">Page with a sidebar</Link>
        </p>
      </main>
    );
  }),
  function PageLayout({ PageComponent, pageProps }) {
    // Data loading simulation
    const [pathParts, setPathParts] = useState<
      { title: string; path: string }[]
    >([]);
    useEffect(() => {
      setTimeout(() => {
        setPathParts([
          { title: "Main", path: "/" },
          { title: "Page with a sidebar", path: "/sidebar" },
          {
            title: "Nested page with a fullscreen layout",
            path: "/sidebar/fullscreen",
          },
        ]);
      }, 1000);
    }, []);

    return (
      <Layout key="layout">
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
