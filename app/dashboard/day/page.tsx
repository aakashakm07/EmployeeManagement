"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

import DayBookHeader from "@/components/daybook/DayBookHeader";
import SummaryCards from "@/components/daybook/SummaryCards";
import TransactionList from "@/components/daybook/TransactionList";
import TransactionDetailsModal from "@/components/daybook/TransactionDetailsModal";
import AddTransactionModal from "@/components/daybook/AddTransactionModal";
import EditTransactionModal from "@/components/daybook/EditTransactionModal";

type Transaction = {
  _id: string;
  party: string;
  type: "Credit" | "Debit";
  amount: number;
  time: string;
  category: string;
  createdAt?: string;
};

export default function DayBookPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [addOpen, setAddOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/daybook");

      const data = await res.json();

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ======================
  // Totals
  // ======================

  const safeTransactions = Array.isArray(transactions)
  ? transactions
  : [];

const totalCredit = safeTransactions
  .filter((t) => t.type === "Credit")
  .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter((t) => t.type === "Debit")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const balance =
    totalCredit - totalDebit;

  // ======================
  // Filters
  // ======================

  const filteredTransactions =
    transactions.filter((item) => {
      const typeMatch =
        typeFilter === "All"
          ? true
          : item.type === typeFilter;

      if (!typeMatch) {
        return false;
      }

      if (
        !item.createdAt ||
        dateFilter === "All"
      ) {
        return true;
      }

      const txDate = new Date(
        item.createdAt
      );

      const now = new Date();

      if (
        dateFilter === "Today"
      ) {
        return (
          txDate.toDateString() ===
          now.toDateString()
        );
      }

      if (
        dateFilter === "This Week"
      ) {
        const weekAgo =
          new Date();

        weekAgo.setDate(
          now.getDate() - 7
        );

        return txDate >= weekAgo;
      }

      if (
        dateFilter === "This Month"
      ) {
        return (
          txDate.getMonth() ===
            now.getMonth() &&
          txDate.getFullYear() ===
            now.getFullYear()
        );
      }

      return true;
    });

  // ======================
  // Delete
  // ======================

  const deleteTransaction =
    async (id: string) => {
      if (
        !confirm(
          "Delete this transaction?"
        )
      ) {
        return;
      }

      try {
        const res = await fetch(
          `/api/daybook/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          alert(
            "Delete failed"
          );
          return;
        }

        fetchTransactions();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#f7f8fb] flex flex-col">

      <DayBookHeader />

      <div className="p-4 sm:p-6 lg:p-8 pb-28">

        {/* Date */}
        <div className="flex items-center gap-3 mb-6 text-sm sm:text-xl">
          <Calendar className="w-5 h-5" />

          <span>
            {new Date().toDateString()}
          </span>
        </div>

        {/* Summary */}
        <SummaryCards
          totalCredit={totalCredit}
          totalDebit={totalDebit}
          balance={balance}
        />

        {/* Transactions */}
        {loading ? (
          <div className="mt-8 bg-white rounded-3xl p-10 text-center">
            Loading...
          </div>
        ) : (
          <TransactionList
            transactions={
              filteredTransactions
            }
            onView={(item) => {
              setSelectedTransaction(
                item
              );
              setDetailsOpen(true);
            }}
            onDelete={
              deleteTransaction
            }
            onEdit={(item) => {
              setEditingTransaction(
                item
              );

              setEditOpen(true);
            }}
            onAdd={() =>
              setAddOpen(true)
            }
            typeFilter={
              typeFilter
            }
            setTypeFilter={
              setTypeFilter
            }
            dateFilter={
              dateFilter
            }
            setDateFilter={
              setDateFilter
            }
          />
        )}
      </div>

      {/* Add Modal */}
      <AddTransactionModal
        open={addOpen}
        onClose={() =>
          setAddOpen(false)
        }
        onSuccess={
          fetchTransactions
        }
      />

      {/* View Modal */}
      <TransactionDetailsModal
        open={detailsOpen}
        onClose={() =>
          setDetailsOpen(false)
        }
        transaction={
          selectedTransaction
        }
      />

      {/* Edit Modal */}
      <EditTransactionModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        transaction={
          editingTransaction
        }
        onSuccess={
          fetchTransactions
        }
      />
    </div>
  );
}