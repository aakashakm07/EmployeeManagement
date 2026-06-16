"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (
    value: string
  ) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative mb-5">

      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={16}
      />

      <input
        className="pl-10 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-xl w-full outline-none"
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />
    </div>
  );
}