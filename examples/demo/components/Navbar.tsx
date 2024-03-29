import Link from "next/link";
import { memo, useEffect, useState } from "react";

function Navbar() {
  const [date, setDate] = useState('[...]')
  useEffect(() => {
    setDate(new Date(Date.now()).toLocaleString());
  }, []);

  return (
    <div className="border-b border-gray-300 pt-2 pb-4 px-8 group">
      <div className="text-gray-600 text-xs text-start opacity-20 -mt-1 -mb-1 transition-opacity group-hover:opacity-100">
        This is a navbar. Note that a focused element maintains its state on the
        route change event.{" "}
        <span className="text-gray-400">
          (Layout rendered at: {date})
        </span>
      </div>
      <nav className="flex justify-center space-x-4">
        <Link href="/" className="text-gray-800 text-base underline">
          Main page
        </Link>
        <Link href="/sidebar" className="text-gray-800 text-base underline">
          Page with a sidebar
        </Link>
        <Link href="/error" className="text-gray-800 text-base underline">
          Page with error handling
        </Link>
        <Link
          href="/query-parsing/1"
          className="text-gray-800 text-base underline"
        >
          Page with query parsing
        </Link>
      </nav>
    </div>
  );
}

export default memo(Navbar);
