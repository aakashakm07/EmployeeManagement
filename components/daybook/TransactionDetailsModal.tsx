"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: any;
};

export default function TransactionDetailsModal({
  open,
  onClose,
  transaction,
}: Props) {
  if (!open || !transaction)
    return null;

  

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md">

        <h2 className="text-2xl font-bold mb-5">
          Transaction Details
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Party:</strong>{" "}
            {transaction.party}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {transaction.type}
          </p>

          <p>
            <strong>Amount:</strong> ₹
            {transaction.amount}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {transaction.category}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {transaction.time}
          </p>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Close
        </button>

      </div>
    </div>
    
  );
}
