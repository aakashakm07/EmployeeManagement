"use client";

import {
  Plus,
  Moon,
  Sun,
} from "lucide-react";

type Props = {
  dark: boolean;
  setDark: (
    value: boolean
  ) => void;
  onAdd: () => void;
};

export default function ProjectsHeader({
  dark,
  setDark,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

      <div>
        <h2 className="text-2xl font-bold dark:text-white">
          Projects History
        </h2>

        <p className="text-gray-500 text-sm">
          Manage all customer projects
        </p>
      </div>

      <div className="flex gap-3 w-full md:w-auto">

        <button
          onClick={onAdd}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={16} />
          Add Project
        </button>

        <button
          onClick={() =>
            setDark(!dark)
          }
          className="border dark:border-gray-700 p-2 rounded-xl dark:text-white"
        >
          {dark ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

      </div>
    </div>
  );
}