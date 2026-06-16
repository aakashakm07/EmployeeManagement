"use client";

import { useEffect, useState } from "react";

interface AttendanceRecord {
  id: string;
  name: string;
  contact: string;
  site: string;
  role: string;
  present: number;
  absent: number;
  salary: number;
  paid: number;
  dues: number;
}

export default function AttendanceRecordsTable() {
  const [records, setRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch(
        "/api/attendance-records"
      );

      const data =
        await res.json();

      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaid = async (
    id: string,
    value: string
  ) => {
    const paid =
      Number(value) || 0;

    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              paid,
              dues:
                record.salary - paid,
            }
          : record
      )
    );

    try {
      await fetch(
        `/api/payroll/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            paid,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">
          Attendance Records
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-3">
                Employee Name
              </th>

              <th className="px-4 py-3">
                Contact No.
              </th>

              <th className="px-4 py-3">
                Site
              </th>

              <th className="px-4 py-3">
                Job Role
              </th>

              <th className="px-4 py-3 text-center">
                Present
              </th>

              <th className="px-4 py-3 text-center">
                Absent
              </th>

              <th className="px-4 py-3 text-right">
                Salary
              </th>

              <th className="px-4 py-3 text-right">
                Paid
              </th>

              <th className="px-4 py-3 text-right">
                Dues
              </th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-8 text-center text-gray-500"
                >
                  No attendance records found
                </td>
              </tr>
            ) : (
              records.map(
                (record) => (
                  <tr
                    key={record.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {record.name}
                    </td>

                    <td className="px-4 py-3">
                      {
                        record.contact
                      }
                    </td>

                    <td className="px-4 py-3">
                      {record.site}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {record.role}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {
                          record.present
                        }
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        {
                          record.absent
                        }
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right font-semibold">
                      ₹
                      {record.salary.toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={
                          record.paid
                        }
                        onChange={(
                          e
                        ) =>
                          updatePaid(
                            record.id,
                            e.target
                              .value
                          )
                        }
                        className="w-28 rounded-lg border px-3 py-2 text-right outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-semibold ${
                          record.dues >
                          0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ₹
                        {record.dues.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}