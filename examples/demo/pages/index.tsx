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
        <p>Here is used the simplest layout:</p>
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
        setPathParts([{ title: "Main", path: "/" }]);
      }, 1000);
    }, []);

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
          `}
        </Highlight>
        <p>
          You may notice that I am using the key property. It is needed to help
          React determine which part of the layout is added or removed without
          the need to re-render it.{" "}
          <a
            href="https://www.google.com/search?q=react+key+prop+definition"
            target="_blank"
            rel="noreferrer"
          >
            I&apos;ll google for you.
          </a>
        </p>
        <br />
        <p>
          Please check the page with sidebar that has nested fullscreen route:{" "}
          <Link href="/sidebar">
            <a>Page with a sidebar</a>
          </Link>
        </p>
        <p>
          Please check the page with error hadling that alternates layout:{" "}
          <Link href="/error">
            <a>Page without error</a>
          </Link>
          {", "}
          <Link href="/error?show_error=true">
            <a>Page with error</a>
          </Link>
        </p>
        <p>
          Please check the page with params validation that alternates layout:{" "}
          <Link href="/query-parsing/1">
            <a>Page without error</a>
          </Link>
          {", "}
          <Link href="/query-parsing/test">
            <a>Page with error</a>
          </Link>
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
        setPathParts([{ title: "Main", path: "/" }]);
      }, 1000);
    }, []);

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <Breadcrumbs key="breadcrumbs" pathParts={pathParts} />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
