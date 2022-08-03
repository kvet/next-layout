import { pageComponentWithLayout } from "@kvet/next-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import Highlight from "../../components/Highlight";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";

export default pageComponentWithLayout(
  memo(function Page() {
    return (
      <main className="py-8 prose mx-auto max-w-4xl">
        <h1>The page with error handling</h1>
        <p>
          Imagine you want to restrict access to the page. Or implement any
          other business logic that envolves the complete change of the page
          layout.
        </p>
        <Highlight>
          {`
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const router = mountHook(() => useRouter());

    if (!router.isReady) {
      return null;
    }

    if (router.query["show_error"]) {
      return (
        <Layout key="layout">
          <main className="py-8 prose mx-auto max-w-4xl">
            <h1>Sorry, something is wrong</h1>
            <p>
              This is a basic error handling. Return to the page without the
              '?show_error=true' query string.{" "}
              <Link href="/error">
                <a>Page without error</a>
              </Link>
            </p>
          </main>
        </Layout>
      );
    }

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
          `}
        </Highlight>
        <p>
          Check the page with sidebar that has nested fullscreen route:{" "}
          <Link href="/error?show_error=true">
            <a>Page with error</a>
          </Link>
        </p>
      </main>
    );
  }),
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const router = mountHook(() => useRouter());

    if (!router.isReady) {
      return null;
    }

    if (router.query["show_error"]) {
      return (
        <Layout key="layout">
          <main className="py-8 prose mx-auto max-w-4xl">
            <h1>Sorry, something is wrong</h1>
            <p>
              This is a basic error handling. Return to the page without the
              '?show_error=true' query string.{" "}
              <Link href="/error">
                <a>Page without error</a>
              </Link>
            </p>
          </main>
        </Layout>
      );
    }

    return (
      <Layout key="layout">
        <Navbar key="navbar" />
        <PageComponent {...pageProps} />
      </Layout>
    );
  }
);
