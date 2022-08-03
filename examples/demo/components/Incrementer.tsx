import { memo, useCallback, useState } from "react";

function Incrementer() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-600 space-x-4">
      <span className="text-gray-800 text-base">Current: {count}</span>
      <button
        className="p-2 text-gray-800 border border-gray-600 hover:border-gray-500 active:border-gray-800"
        onClick={increment}
      >
        Increment
      </button>
    </div>
  );
}

export default memo(Incrementer);
