"use client";

import {
  Plus,
  Home,
  BookOpen,
  BarChart3,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

type Transaction = {
  _id: string;
  party: string;
  type: "Credit" | "Debit";
  amount: number;
  time: string;
  category: string;
};

type Props = {
  transactions: Transaction[];

  onView: (
    item: Transaction
  ) => void;

  onDelete?: (
    id: string
  ) => void;

  onEdit?: (
    item: Transaction
  ) => void;

  onAdd?: () => void;

  typeFilter: string;
  setTypeFilter: (
    value: string
  ) => void;

  dateFilter: string;
  setDateFilter: (
    value: string
  ) => void;
};

export default function TransactionList({
  transactions,
  onView,
  onDelete,
  onEdit,
  onAdd,
  typeFilter,
  setTypeFilter,
  dateFilter,
  setDateFilter,
}: Props) {
  return (
    <>
      <div className="mt-8 bg-white rounded-3xl border shadow-sm p-4 sm:p-5">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <h2 className="text-lg sm:text-2xl font-bold">
            Transactions ({transactions.length})
          </h2>

          <div className="flex flex-wrap items-center gap-2">

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            >
              <option value="All">
                All
              </option>

              <option value="Credit">
                Credit
              </option>

              <option value="Debit">
                Debit
              </option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            >
              <option value="All">
                All Dates
              </option>

              <option value="Today">
                Today
              </option>

              <option value="This Week">
                This Week
              </option>

              <option value="This Month">
                This Month
              </option>
            </select>

            <button
              onClick={onAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-4">
          {transactions.map(
            (item) => (
              <div
                key={item._id}
                onClick={() =>
                  onView(item)
                }
                className="cursor-pointer border rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition"
              >
                <div className="flex gap-4">

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
                      item.type ===
                      "Credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.party[0]}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg sm:text-xl">
                      {item.party}
                    </h3>

                    <p className="text-slate-500 text-sm">
                      {item.category}
                    </p>

                    <p className="text-slate-500 text-sm">
                      {item.time}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">

                  <h3
                    className={`font-bold text-xl sm:text-2xl ${
                      item.type ===
                      "Credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type ===
                    "Credit"
                      ? "+"
                      : "-"}
                    ₹
                    {item.amount}
                  </h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-xl text-sm ${
                      item.type ===
                      "Credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.type}
                  </span>

                  <div className="flex justify-end gap-3 mt-3">

                    <button
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        onEdit?.(
                          item
                        );
                      }}
                      className="p-2 rounded-lg border hover:bg-gray-100"
                    >
                      <Pencil
                        size={16}
                      />
                    </button>

                    <button
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        onDelete?.(
                          item._id
                        );
                      }}
                      className="p-2 rounded-lg border text-red-600 hover:bg-red-50"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>

                  </div>
                </div>
              </div>
            )
          )}

          {transactions.length ===
            0 && (
            <div className="text-center py-10 text-slate-500">
              No transactions
              found
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t h-20 flex justify-around items-center z-50">

        {/* <button className="flex flex-col items-center text-slate-500 text-xs">
          <Home size={20} />
          Home
        </button>

        <button className="flex flex-col items-center text-blue-600 text-xs">
          <BookOpen size={20} />
          Day Book
        </button>

        <button className="flex flex-col items-center text-slate-500 text-xs">
          <BarChart3 size={20} />
          Reports
        </button>

        <button className="flex flex-col items-center text-slate-500 text-xs">
          <MoreHorizontal size={20} />
          More
        </button> */}

        <button
          onClick={onAdd}
          className="absolute -top-6 right-5 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center"
        >
          <Plus />
        </button>
      </div>
    </>
  );
}