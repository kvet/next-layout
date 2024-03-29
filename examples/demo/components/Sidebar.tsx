import Link from "next/link";
import { Fragment, memo, ReactElement, ReactNode, useEffect, useRef, useState } from "react";

function Sidebar({
  paths,
  children,
}: {
  paths: { title: string; path: string }[];
  children: ReactNode;
}): ReactElement {
  const [date, setDate] = useState('[...]')
  useEffect(() => {
    setDate(new Date(Date.now()).toLocaleString());
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="md:w-64 flex-shrink-0 border-r border-gray-300 py-4 group">
        <div className="text-center text-xs text-gray-600 opacity-20 transition-opacity group-hover:opacity-100">
          This is a sidebar.{" "}
          <span className="text-gray-400">(Rendered at: {date})</span>
        </div>
        <nav className="flex flex-col justify-start px-4 py-2 space-y-2">
          {!paths.length && (
            <span className="text-gray-600 text-base animate-pulse">
              Loading...
            </span>
          )}
          {paths.map(({ title, path }) => (
            <Fragment key={path}>
              <Link href={path} className="text-gray-600 text-sm underline">
                {title}
              </Link>
            </Fragment>
          ))}
        </nav>
      </div>
      <div className="flex-grow flex-shrink">{children}</div>
    </div>
  );
}

export default memo(Sidebar);
