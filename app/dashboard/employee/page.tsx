"use client";

import dynamic from "next/dynamic";

const EmployeeManagement = dynamic(
  () => import("@/components/EmployeeManagement"),
  {
    ssr: false,
  }
);

export default function EmployeePage() {
  return <EmployeeManagement />;
}
