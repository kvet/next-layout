import type { ComponentType } from "react";
import { getLayoutSymbol } from "../Layout/consts";
import type { GetLayoutFn, PageComponentWithLayout } from "../Layout/types";

export default function pageComponentWithLayout<
  PageProps extends Record<string, unknown> = {},
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
>(
  PageComponent: ComponentType<PageProps>,
  getLayout: GetLayoutFn<PageProps, ProvidedPageProps>
): PageComponentWithLayout<PageProps, ProvidedPageProps> {
  const typedPageComponent: PageComponentWithLayout<
    PageProps,
    ProvidedPageProps
  > = PageComponent;
  typedPageComponent[getLayoutSymbol] = getLayout;
  return typedPageComponent;
}
