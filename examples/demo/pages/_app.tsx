import { AppPropsWithLayout, LayoutHost } from "@kvet/next-layout";
import { memo, ReactElement } from "react";

import "../styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  return <LayoutHost PageComponent={Component} pageProps={pageProps} />;
}

export default memo(App);
