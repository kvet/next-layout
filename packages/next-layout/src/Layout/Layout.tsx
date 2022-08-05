import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { memo, useMemo, useRef } from "react";
import type { ReactElement, ComponentType } from "react";

import useUpdate from "../hooks_general/useUpdate";
import LayoutHookMounter from "./LayoutHookMounter";
import LayoutRenderer from "./LayoutRenderer";

export type MountHookFn = <T extends () => unknown>(hookCb: T) => ReturnType<T>;

export type GetLayoutFn<
  PageProps extends Record<string, unknown> = {},
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
> = ({
  pageComponent,
  pageProps,
  mountHook,
}: {
  pageComponent: ComponentType<PageProps>;
  pageProps: ProvidedPageProps;
  mountHook: MountHookFn;
}) => ReactElement | null;

export type PageComponentWithLayout<
  PageProps extends Record<string, unknown> = {},
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
> = NextPage<PageProps> & {
  getLayout?: GetLayoutFn<PageProps, ProvidedPageProps>;
};

const DEFAULT_LAYOUT: GetLayoutFn<any> = ({
  pageComponent: PageComponent,
  pageProps,
}) => <PageComponent {...pageProps} />;

export type LayoutProps<T extends Record<string, unknown>> = {
  pageComponent: PageComponentWithLayout<T>;
  pageProps?: T;
};

function Layout<T extends Record<string, unknown> = {}>({
  pageComponent: PageComponent,
  pageProps,
}: LayoutProps<T>): ReactElement | null {
  const router = useRouter();

  const getLayout = PageComponent.getLayout || DEFAULT_LAYOUT;

  const BoundLayoutHookMounter = useMemo(() => {
    return memo(LayoutHookMounter.bind({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLayout]);

  const boundHooks = useRef<any[]>();
  useMemo(() => {
    boundHooks.current = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLayout]);

  const update = useUpdate();

  return (
    <>
      <BoundLayoutHookMounter
        getLayout={getLayout}
        pageProps={pageProps}
        hooks={boundHooks}
        onUpdate={update}
      />
      <LayoutRenderer
        getLayout={getLayout}
        pageComponent={PageComponent}
        pageProps={pageProps}
        hooks={boundHooks}
      />
    </>
  );
}

export default memo(Layout) as typeof Layout;

export type AppPropsWithLayout<T extends Record<string, unknown> = {}> =
  AppProps & {
    PageComponent: PageComponentWithLayout<T>;
  };

