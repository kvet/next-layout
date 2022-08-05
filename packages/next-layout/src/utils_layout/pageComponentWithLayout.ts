import type { ComponentType } from "react";
import type { GetLayoutFn, PageComponentWithLayout } from "../Layout/Layout";

export default function pageComponentWithLayout<
  PageProps extends Record<string, unknown> = {},
  ProvidedPageProps extends Partial<PageProps> = Partial<PageProps>
>(
  pageComponent: ComponentType<PageProps>,
  getLayout: GetLayoutFn<PageProps, ProvidedPageProps>
): PageComponentWithLayout<PageProps, ProvidedPageProps> {
  const typedPageComponent: PageComponentWithLayout<
    PageProps,
    ProvidedPageProps
  > = pageComponent;
  typedPageComponent.getLayout = getLayout;
  return typedPageComponent;
}
