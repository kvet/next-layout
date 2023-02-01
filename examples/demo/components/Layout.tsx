import { memo, ReactElement, ReactNode, useEffect, useState } from "react";

function Layout({ children }: { children: ReactNode }): ReactElement {
  const [date, setDate] = useState('[...]')
  useEffect(() => {
    setDate(new Date(Date.now()).toLocaleString());
  }, []);

  return (
    <div>
      {children}
      <div className="border-t border-gray-300 py-4 px-8 text-gray-600 text-sm text-center">
        This is a demo of{" "}
        <a
          href="https://www.npmjs.com/package/@kvet/next-layout"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          the &quot;
          <span className="font-bold text-blue-600">@kvet/next-layout</span>
          &quot; package
        </a>
        . Note that the layout component maintains its state on the route change
        event.{" "}
        <span className="text-gray-400">
          (The layout rendered at: {date})
        </span>
      </div>
    </div>
  );
}

export default memo(Layout);
