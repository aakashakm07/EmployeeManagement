"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddTransactionModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [party, setParty] = useState("");
  const [type, setType] = useState<
    "Credit" | "Debit"
  >("Credit");
  const [amount, setAmount] =
    useState("");
  const [category, setCategory] =
    useState("");

 const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "/api/daybook",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          party,
          type,
          amount: Number(amount),
          category,
          time:
            new Date().toLocaleTimeString(),
        }),
      }
    );

    const data =
      await res.json();

    console.log(
      "POST RESPONSE:",
      data
    );

    if (!res.ok) {
      alert(
        data.message ||
          "Failed"
      );
      return;
    }

    onSuccess();

    setParty("");
    setAmount("");
    setCategory("");
    setType("Credit");

    onClose();
  } catch (error) {
    console.error(error);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

      <div className="bg-white rounded-3xl p-6 w-[95%] max-w-md">

        <h2 className="text-2xl font-bold mb-5">
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Party Name"
            value={party}
            onChange={(e) =>
              setParty(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
            required
          />

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target
                  .value as
                  | "Credit"
                  | "Debit"
              )
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="Credit">
              Credit
            </option>

            <option value="Debit">
              Debit
            </option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
            required
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-xl py-3"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}