"use client";

import {
  Menu,
  Calendar,
} from "lucide-react";

export default function DayBookHeader() {
  return (
    <div className="bg-white border-b px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">

      <div className="flex items-center gap-3 sm:gap-5">
        <Menu className="w-6 h-6 sm:w-7 sm:h-7" />

        <h1 className="text-2xl sm:text-3xl font-bold">
          Day Book
        </h1>
      </div>

      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border bg-white flex items-center justify-center shadow-sm">
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}