import { memo, ReactElement, ReactNode, useRef } from "react";

function Layout({ children }: { children: ReactNode }): ReactElement {
  const date = useRef(new Date(Date.now()).toLocaleString());

  return (
    <div>
      {children}
      <div className="border-t border-gray-300 py-4 px-8 text-gray-600 text-sm text-center">
        This is a demo of{" "}
        <a
          href="https://www.npmjs.com/package/@kvet/next-layout"
          target="_blank"
          className="underline"
        >
          the "
          <span className="font-bold text-blue-600">@kvet/next-layout</span>"
          package
        </a>
        . Note that the layout component maintains its state on the route change
        event.{" "}
        <span className="text-gray-400">
          (The layout rendered at: {date.current})
        </span>
      </div>
    </div>
  );
}

export default memo(Layout);
