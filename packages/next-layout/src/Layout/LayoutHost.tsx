import React, { memo, useCallback, useMemo, useRef } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import type { GetLayoutFn, PageComponentWithLayout } from "./types";
import LayoutRenderer from "./LayoutRenderer";
import LayoutMounter from "./LayoutMounter";
import { getLayoutSymbol } from "./consts";

function getDefaultLayout({
  PageComponent,
  pageProps,
}: ComponentProps<GetLayoutFn<Record<string, unknown>>>): ReactElement {
  return <PageComponent {...pageProps} />;
}

export type LayoutHostProps<
  T extends Record<string, unknown> = Record<string, never>
> = {
  PageComponent: PageComponentWithLayout<T>;
  pageProps?: T;
};

function LayoutHost<T extends Record<string, unknown> = Record<string, never>>({
  PageComponent,
  pageProps,
}: LayoutHostProps<T>): ReactElement | null {
  const getLayout = PageComponent[getLayoutSymbol] || getDefaultLayout;

  const BoundLayoutMounter = useMemo(() => {
    return memo(LayoutMounter.bind({}));
    // NOTE: cheatty solution to ensure component re-render on layout change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLayout]);

  const layoutChildrenRef = useRef<ReactNode | null>(null);

  const layoutRendererRef = useRef<LayoutRenderer>(null);
  const forceUpdate = useCallback(() => layoutRendererRef.current?.forceUpdate(), []);

  return (
    <>
      <BoundLayoutMounter
        getLayout={getLayout}
        PageComponent={PageComponent}
        pageProps={pageProps}
        layoutChildrenRef={layoutChildrenRef}
        onUpdate={forceUpdate}
      />
      <LayoutRenderer
        ref={layoutRendererRef}
        layoutChildrenRef={layoutChildrenRef}
      />
    </>
  );
}

export default memo(LayoutHost) as typeof LayoutHost;
