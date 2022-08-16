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
export default pageComponentWithLayout(
  function Page() { /* ... */ },
  function PageLayout({ PageComponent, pageProps }) {
    const router = useRouter();

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
              &quot;?show_error=true&quot; query string.{" "}
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
          `}
        </Highlight>
        <p>
          Check error handling in action:{" "}
          <Link href="/error?show_error=true">
            <a>Page with error</a>
          </Link>
        </p>
      </main>
    );
  }),
  function PageLayout({ PageComponent, pageProps }) {
    const router = useRouter();

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
              &quot;?show_error=true&quot; query string.{" "}
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
