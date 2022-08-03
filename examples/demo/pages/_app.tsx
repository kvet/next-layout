import { AppPropsWithLayout, Layout } from "@kvet/next-layout";
import { memo, ReactElement } from "react";

import "../styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  return <Layout pageComponent={Component} pageProps={pageProps} />;
}

export default memo(App);
