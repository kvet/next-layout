import Link from "next/link";
import { memo, useRef } from "react";

function Breadcrumbs({
  pathParts,
}: {
  pathParts: { title: string; path: string }[];
}) {
  const date = useRef(new Date(Date.now()).toLocaleString());

  return (
    <div className="border-b border-gray-300 pt-2 pb-4 px-8 group">
      <div className="text-gray-600 text-xs text-start opacity-20 -mt-1 -mb-1 transition-opacity group-hover:opacity-100">
        This is breadcrumbs. Note that it is not a &quot;god&quot; component. Data loading
        is decoupled by the use of hooks inside the page layout.{" "}
        <span className="text-gray-400">
          (Breadcrumbs rendered at: {date.current})
        </span>
      </div>
      <nav className="flex justify-start">
        {!pathParts.length && (
          <span className="text-gray-600 text-base animate-pulse">
            Loading...
          </span>
        )}
        {pathParts.map(({ title, path }) => (
          <>
            <Link key={path} href={path}>
              <a className="text-gray-600 text-base underline">{title}</a>
            </Link>
            &nbsp;/&nbsp;
          </>
        ))}
      </nav>
    </div>
  );
}

export default memo(Breadcrumbs);
