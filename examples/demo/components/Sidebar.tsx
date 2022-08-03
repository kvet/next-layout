import Link from "next/link";
import { memo, ReactElement, ReactNode, useRef } from "react";

function Sidebar({
  paths,
  children,
}: {
  paths: { title: string; path: string }[];
  children: ReactNode;
}): ReactElement {
  const date = useRef(new Date(Date.now()).toLocaleString());

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="md:w-64 flex-shrink-0 border-r border-gray-300 py-4 group">
        <div className="text-center text-xs text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
          This is a sidebar.{" "}
          <span className="text-gray-400">(Rendered at: {date.current})</span>
        </div>
        <nav className="flex flex-col justify-start px-4 py-2 space-y-2">
          {!paths.length && (
            <span className="text-gray-600 text-base animate-pulse">
              Loading...
            </span>
          )}
          {paths.map(({ title, path }) => (
            <>
              <Link key={path} href={path}>
                <a className="text-gray-600 text-sm underline">{title}</a>
              </Link>
            </>
          ))}
        </nav>
      </div>
      <div className="flex-grow flex-shrink">{children}</div>
    </div>
  );
}

export default memo(Sidebar);
