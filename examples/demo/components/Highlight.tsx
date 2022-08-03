import { memo } from "react";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("typescript", typescript);
import "highlight.js/styles/tokyo-night-dark.css";

function Highlight({ children }: { children: string }) {
  return <pre dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language: "typescript" }).value }} />;
}

export default memo(Highlight);
