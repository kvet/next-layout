import { pageComponentWithLayout, safeParsePositiveIntegerParam, useRouteParamsResolver } from "@kvet/next-layout";
import Link from "next/link";
import { memo } from "react";
import Highlight from "../../components/Highlight";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";

type PageProps = { id: number }; // Page component props
type GlobalPageProps = {}; // Global page props received from the '_app.tsx'

export default pageComponentWithLayout<PageProps, GlobalPageProps>(
  memo(function Page({ id }) {
    return (
      <main className="py-8 prose mx-auto max-w-4xl">
        <h1>The page with query parameters parsing</h1>
        <p>
          The lib embeds the params parsing solution. The parsed &apos;id&apos; is &apos;{id}&apos; with a type &apos;{typeof id}&apos;.
        </p>
        <Highlight>
          {`
type PageProps = { id: number };
type GlobalPageProps = {};

export default pageComponentWithLayout<PageProps, GlobalPageProps>(
  function Page({ id }) { /* ... */ },
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const resolvedPageProps = mountHook(() =>
      useRouteParamsResolver(pageProps, {
        id: (router) => safeParsePositiveIntegerParam(router.query.id),
      })
    );

    if (resolvedPageProps.status === 'loading') {
      return null;
    }

    if (resolvedPageProps.status === 'error') {
      return (
        <Layout key="layout">
          <main className="py-8 prose mx-auto max-w-4xl">
            <h1>Sorry, the 'id' query parameter is wrong</h1>
            <p>
              This is a basic error handling. Return to the page with the proper 'id'
              query parameter.{" "}
              <Link href="/query-parsing/1">
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
        <PageComponent {...resolvedPageProps.props} />
      </Layout>
    );
  }
);
          `}
        </Highlight>
        <p>
          Check query parsing in action:{" "}
          <Link href="/query-parsing/test">
            <a>Page with wrong query param type</a>
          </Link>
        </p>
      </main>
    );
  }),
  ({ pageComponent: PageComponent, pageProps, mountHook }) => {
    const resolvedPageProps = mountHook(() =>
      useRouteParamsResolver(pageProps, {
        id: (router) => safeParsePositiveIntegerParam(router.query.id),
      })
    );

    if (resolvedPageProps.status === 'loading') {
      return null;
    }

    if (resolvedPageProps.status === 'error') {
      return (
        <Layout key="layout">
          <main className="py-8 prose mx-auto max-w-4xl">
            <h1>Sorry, the &apos;id&apos; query parameter is wrong</h1>
            <p>
              This is a basic error handling. Return to the page with the proper &apos;id&apos;
              query parameter.{" "}
              <Link href="/query-parsing/1">
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
        <PageComponent {...resolvedPageProps.props} />
      </Layout>
    );
  }
);
