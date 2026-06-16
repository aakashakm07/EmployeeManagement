"use client";

import { X } from "lucide-react";
import { ErrorType, FormType } from "@/types/project";

type Props = {
  open: boolean;
  form: FormType;
  errors: ErrorType;
  editId: string | null;

  setForm: (value: FormType) => void;

  onClose: () => void;
  onSave: () => void;
};

export default function ProjectModal({
  open,
  form,
  errors,
  editId,
  setForm,
  onClose,
  onSave,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold dark:text-white">
            {editId ? "Update Project" : "Add Project"}
          </h3>

          <button onClick={onClose} className="dark:text-white">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          {(Object.keys(form) as (keyof FormType)[]).map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1 dark:text-gray-200">
                {field === "customer"
                  ? "Customer Name"
                  : field === "contact"
                    ? "Contact Number"
                    : field === "place"
                      ? "Place"
                      : field === "product"
                        ? "Product"
                        : field === "amount"
                          ? "Amount"
                          : "Received Amount"}
              </label>

              <input
                type={
                  field === "amount" || field === "received"
                    ? "number"
                    : field === "contact"
                      ? "tel"
                      : "text"
                }
                placeholder={`Enter ${
                  field === "customer"
                    ? "Customer Name"
                    : field === "contact"
                      ? "Contact Number"
                      : field === "place"
                        ? "Place"
                        : field === "product"
                          ? "Product"
                          : field === "amount"
                            ? "Amount"
                            : "Received Amount"
                }`}
                value={form[field] ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value,
                  })
                }
                className={`w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-xl outline-none ${
                  errors[field] ? "border-red-500" : ""
                }`}
              />

              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            onClick={onSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            {editId ? "Update" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
