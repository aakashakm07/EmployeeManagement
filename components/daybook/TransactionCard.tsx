"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onView: (item: any) => void;
};

export default function TransactionCard({
  item,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <div
      onClick={() => onView(item)}
      className="border rounded-3xl p-5 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between">

        <div>
          <h3 className="font-bold text-xl">
            {item.party}
          </h3>

          <p className="text-slate-500">
            {item.category}
          </p>

          <p className="text-slate-500">
            {item.time}
          </p>
        </div>

        <div className="text-right">
          <h3
            className={`font-bold text-2xl ${
              item.type === "Credit"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{item.amount}
          </h3>

          <div className="flex gap-2 mt-3 justify-end">

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item._id);
              }}
            >
              <Trash2
                size={18}
                className="text-red-600"
              />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}