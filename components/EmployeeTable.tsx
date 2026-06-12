"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";

type Props = {
  employees: Employee[];
  attendance: Record<
    string,
    Record<
      string,
      boolean
    >
  >;
  selectedDate: string;
  onEdit: (
    emp: Employee
  ) => void;
  onDelete: (
    id: string
  ) => void;
};

export default function EmployeeTable({
  employees,
  attendance,
  selectedDate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full text-sm">

        <thead className="bg-slate-100 dark:bg-zinc-800">
          <tr>
            <th className="p-3 text-left">
              Name
            </th>
            <th className="p-3 text-left">
              Contact
            </th>
            <th className="p-3 text-left">
              Site
            </th>
            <th className="p-3 text-left">
              Job
            </th>
            <th className="p-3 text-center">
              Attendance
            </th>
            <th className="p-3 text-center">
              Salary
            </th>
            <th className="p-3 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map(
            (emp) => {
              const status =
                attendance[
                  emp._id ||
                    ""
                ]?.[
                  selectedDate
                ];

              return (
                <tr
                  key={
                    emp._id
                  }
                  className="border-b"
                >
                  <td className="p-3">
                    {emp.name}
                  </td>

                  <td className="p-3">
                    {
                      emp.contact
                    }
                  </td>

                  <td className="p-3">
                    {emp.site}
                  </td>

                  <td className="p-3 capitalize">
                    {emp.job}
                  </td>

                  <td className="p-3 text-center">
                    {status ===
                    undefined
                      ? "-"
                      : status
                      ? "P"
                      : "A"}
                  </td>

                  <td className="p-3 text-center font-bold text-green-600">
                    ₹
                    {status
                      ? emp.salary
                      : 0}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-end gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onEdit(
                            emp
                          )
                        }
                      >
                        <Pencil size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          onDelete(
                            emp._id ||
                              ""
                          )
                        }
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}