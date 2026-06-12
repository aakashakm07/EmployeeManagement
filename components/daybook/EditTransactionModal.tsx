"use client";

import { useEffect, useState } from "react";

type Transaction = {
  _id: string;
  party: string;
  type: "Credit" | "Debit";
  amount: number;
  category: string;
  time: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSuccess: () => void;
};

export default function EditTransactionModal({
  open,
  onClose,
  transaction,
  onSuccess,
}: Props) {
  const [party, setParty] =
    useState("");

  const [type, setType] =
    useState<"Credit" | "Debit">(
      "Credit"
    );

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    if (transaction) {
      setParty(
        transaction.party
      );

      setType(
        transaction.type
      );

      setAmount(
        String(
          transaction.amount
        )
      );

      setCategory(
        transaction.category
      );
    }
  }, [transaction]);

  const handleUpdate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!transaction)
        return;

      await fetch(
        `/api/daybook/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            party,
            type,
            amount:
              Number(amount),
            category,
          }),
        }
      );

      onSuccess();
      onClose();
    };

  if (
    !open ||
    !transaction
  )
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-[95%] max-w-md">

        <h2 className="text-2xl font-bold mb-5">
          Edit Transaction
        </h2>

        <form
          onSubmit={
            handleUpdate
          }
          className="space-y-4"
        >
          <input
            value={party}
            onChange={(e) =>
              setParty(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
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
            <option>
              Credit
            </option>
            <option>
              Debit
            </option>
          </select>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={
                onClose
              }
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-xl py-3"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}