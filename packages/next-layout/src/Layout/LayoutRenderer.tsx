import { ComponentType, MutableRefObject, ReactElement } from "react";

import { GetLayoutFn } from "./Layout";

type LayoutRendererProps = {
  getLayout: GetLayoutFn<any>;
  pageComponent: ComponentType<any>;
  pageProps: any;
  hooks: MutableRefObject<any[] | undefined>;
};

export default function LayoutRenderer({
  getLayout,
  pageComponent,
  pageProps,
  hooks,
}: LayoutRendererProps): ReactElement | null {
  let hooksIndexer = 0;
  return getLayout({
    pageComponent,
    pageProps,
    mountHook: (cb) => {
      if (!hooks.current) throw new Error("Error while layout hooks bounding");
      return hooks.current[hooksIndexer++] as ReturnType<typeof cb>;
    },
  });
}
