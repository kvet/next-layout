import Link from "next/link";
import { memo, useRef } from "react";

function Navbar() {
  const date = useRef(new Date(Date.now()).toLocaleString());

  return (
    <div className="border-b border-gray-300 pt-2 pb-4 px-8 group">
      <div className="text-gray-600 text-xs text-start opacity-20 -mt-1 -mb-1 transition-opacity group-hover:opacity-100">
        This is a navbar. Note that a focused element maintains its state on the
        route change event.{" "}
        <span className="text-gray-400">(Layout rendered at: {date.current})</span>
      </div>
      <nav className="flex justify-center space-x-4">
        <Link href="/">
          <a className="text-gray-800 text-base underline">Main page</a>
        </Link>
        <Link href="/sidebar">
          <a className="text-gray-800 text-base underline">Page with a sidebar</a>
        </Link>
        <Link href="/error">
          <a className="text-gray-800 text-base underline">Page with error handling</a>
        </Link>
        <Link href="/query-parsing/1">
          <a className="text-gray-800 text-base underline">Page with query parsing</a>
        </Link>
      </nav>
    </div>
  );
}

export default memo(Navbar);
