import type { MutableRefObject, ReactNode } from "react";

import useIsomorphicLayoutEffect from "../hooks_general/useIsomorphicLayoutEffect";
import { GetLayoutFn, PageComponentWithLayout } from "./types";

type LayoutMounterProps = {
  getLayout: GetLayoutFn<any>;
  PageComponent: PageComponentWithLayout<any>;
  pageProps: any;
  layoutChildrenRef: MutableRefObject<ReactNode | null>;
  onUpdate: () => void;
};

function LayoutMounter({
  getLayout,
  PageComponent,
  pageProps,
  layoutChildrenRef,
  onUpdate,
}: LayoutMounterProps): null {
  layoutChildrenRef.current = getLayout({
    PageComponent,
    pageProps,
  });

  useIsomorphicLayoutEffect(() => {
    onUpdate();
  });

  return null;
}

export default LayoutMounter;
