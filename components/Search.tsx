"use client";

import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useRef, useState } from "react";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);
  const [text, setText] = useState(search);

  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push("/");
    } else {
      router.push(`?search=${query}`);
    }
  }, [query]);
  return (
    <div className="flex justify-center w-[90%] mx-auto max-w-[1500px]">
      <input
        type="text"
        value={text}
        placeholder="Search Pokemon..."
        onChange={(e) => setText(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-yellow-500 sm:text-sm sm:leading-6 mb-10"
      />
    </div>
  );
};

export default Search;
