"use client";

import {
  ArrowUp,
  ArrowDown,
  Wallet,
} from "lucide-react";

type Props = {
  totalCredit: number;
  totalDebit: number;
  balance: number;
};

export default function SummaryCards({
  totalCredit,
  totalDebit,
  balance,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

      {/* Credit */}
      <div className="bg-green-50 border border-green-100 rounded-3xl p-5">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <ArrowUp className="text-green-600" />
        </div>

        <p className="text-slate-600 text-sm sm:text-lg">
          Total Credit
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
          ₹{totalCredit}
        </h2>
      </div>

      {/* Debit */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-5">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ArrowDown className="text-red-600" />
        </div>

        <p className="text-slate-600 text-sm sm:text-lg">
          Total Debit
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
          ₹{totalDebit}
        </h2>
      </div>

      {/* Balance */}
      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 sm:col-span-2 xl:col-span-1">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Wallet className="text-blue-600" />
        </div>

        <p className="text-slate-600 text-sm sm:text-lg">
          Closing Balance
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
          ₹{balance}
        </h2>
      </div>
    </div>
  );
}