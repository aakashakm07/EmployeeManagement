"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Project } from "@/types/project";

type Props = {
  projects: Project[];
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
};

export default function ProjectsTable({ projects, onEdit, onDelete }: Props) {
  const statusStyles = {
    PAID: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",

    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-4 text-left dark:text-white">Customer</th>

            <th className="p-4 text-left dark:text-white">Contact</th>

            <th className="p-4 text-left dark:text-white">Place</th>

            <th className="p-4 text-left dark:text-white">Product</th>

            <th className="p-4 text-left dark:text-white">Amount</th>

            <th className="p-4 text-left dark:text-white">Received</th>

            <th className="p-4 text-left dark:text-white">Status</th>

            <th className="p-4 text-left dark:text-white">Date</th>

            <th className="p-4 text-center dark:text-white">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.length ? (
            projects.map((p) => (
              <tr
                key={p._id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-4 dark:text-white">{p.customer}</td>

                <td className="p-4 dark:text-white">{p.contact}</td>

                <td className="p-4 dark:text-white">{p.place}</td>

                <td className="p-4 dark:text-white">{p.product}</td>

                <td className="p-4 dark:text-white">
                  ₹{p.amount.toLocaleString()}
                </td>

                <td className="p-4 dark:text-white">
                  ₹{p.received.toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="p-4 dark:text-white">{p.date}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(p._id!)}
                      className="p-2 rounded-lg bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-10 text-gray-500">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
