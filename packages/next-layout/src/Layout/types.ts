import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ComponentType, ReactElement } from "react";
import { getLayoutSymbol } from "./consts";

export type GetLayoutFn<
  PageProps extends Record<string, unknown> = Record<string, never>,
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
> = (props: {
  PageComponent: ComponentType<PageProps>;
  pageProps: ProvidedPageProps;
}) => ReactElement | null;

export type PageComponentWithLayout<
  PageProps extends Record<string, unknown> = Record<string, never>,
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
> = NextPage<PageProps> & {
  [getLayoutSymbol]?: GetLayoutFn<PageProps, ProvidedPageProps>;
};

export type AppPropsWithLayout<
  PageProps extends Record<string, unknown> = Record<string, never>,
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
> = AppProps & {
  PageComponent: PageComponentWithLayout<PageProps, ProvidedPageProps>;
};
