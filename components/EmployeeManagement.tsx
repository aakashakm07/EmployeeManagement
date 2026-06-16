"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Users,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

import AddEmployeeForm from "@/components/AddEmployeeForm";
import EmployeeToolbar from "@/components/EmployeeToolbar";
import EmployeeTable from "@/components/EmployeeTable";
import EditEmployeeDialog from "@/components/EditEmployeeDialog";
import AttendanceDialog from "@/components/AttendanceDialog";

import { Employee } from "@/types/employee";

export default function EmployeeManagement() {

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [siteFilter, setSiteFilter] =
    useState("ALL");

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [attendance, setAttendance] =
    useState<
      Record<
        string,
        Record<string, boolean>
      >
    >({});

  const [bulkAttendance, setBulkAttendance] =
    useState<
      Record<
        string,
        boolean
      >
    >({});

  const [openAttendance, setOpenAttendance] =
    useState(false);

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedEmp, setSelectedEmp] =
    useState<Employee | null>(
      null
    );

  // FETCH
  const fetchEmployees =
    async () => {
      const res =
        await fetch(
          "/api/employees"
        );

      const data =
        await res.json();

      setEmployees(
        data
      );

      setLoading(
        false
      );
    };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD
  const handleAdd =
    async (
      emp: Employee
    ) => {
      const res =
        await fetch(
          "/api/employees",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              emp
            ),
          }
        );

      const data =
        await res.json();

      setEmployees(
        (prev) => [
          ...prev,
          data,
        ]
      );

      setOpenAdd(
        false
      );
    };

  // EDIT
  const handleSave =
  async () => {
    if (
      !selectedEmp
    )
      return;

    const res =
      await fetch(
        `/api/employees/${selectedEmp._id}`,
        {
          method:
            "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            selectedEmp
          ),
        }
      );

    const updated =
      await res.json();

    if (
      !updated?._id
    )
      return;

    setEmployees(
      (prev) =>
        prev.map(
          (emp) =>
            emp._id ===
            updated._id
              ? updated
              : emp
        )
    );

    setOpenEdit(
      false
    );
  };

  // DELETE
  const handleDelete =
    async (
      id: string
    ) => {
      await fetch(
        `/api/employees/${id}`,
        {
          method:
            "DELETE",
        }
      );

      setEmployees(
        (prev) =>
          prev.filter(
            (e) =>
              e._id !==
              id
          )
      );
    };

  // ATTENDANCE SAVE ===========================
 const saveAttendance = async () => {
  try {
    const records = Object.entries(
      bulkAttendance
    ).map(([employeeId, value]) => ({
      employeeId,
      date: selectedDate,
      status: value
        ? "Present"
        : "Absent",
    }));

    const res = await fetch(
      "/api/attendance",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          records,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to save attendance"
      );
    }

    setOpenAttendance(false);

    alert(
      "Attendance saved successfully"
    );
  } catch (error) {
    console.error(error);

    alert(
      "Failed to save attendance"
    );
  }
};
// ==============================================================
  const sites =
    useMemo(() => {
      const unique =
        new Set(
          employees.map(
            (e) =>
              e.site
          )
        );

      return [
        "ALL",
        ...Array.from(
          unique
        ),
      ];
    }, [employees]);

  const filteredEmployees =
    useMemo(() => {
      return employees.filter(
        (e) =>
          e.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) &&
          (siteFilter ===
            "ALL" ||
            e.site ===
              siteFilter)
      );
    }, [
      employees,
      search,
      siteFilter,
    ]);

  if (loading)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border">

      <div className="flex items-center gap-2 mb-5">
        <Users size={22} />

        <h2 className="text-2xl font-bold">
          Employee Management
        </h2>
      </div>

      <EmployeeToolbar
        search={
          search
        }
        setSearch={
          setSearch
        }
        siteFilter={
          siteFilter
        }
        setSiteFilter={
          setSiteFilter
        }
        sites={
          sites
        }
        selectedDate={
          selectedDate
        }
        setSelectedDate={
          setSelectedDate
        }
        onAttendance={() => {
          const initial:
            Record<
              string,
              boolean
            > = {};

          employees.forEach(
            (emp) => {
              initial[
                emp._id ||
                  ""
              ] =
                attendance[
                  emp._id ||
                    ""
                ]?.[
                  selectedDate
                ] ??
                false;
            }
          );

          setBulkAttendance(
            initial
          );

          setOpenAttendance(
            true
          );
        }}
        onAdd={() =>
          setOpenAdd(
            true
          )
        }
      />

      <EmployeeTable
        employees={
          filteredEmployees
        }
        attendance={
          attendance
        }
        selectedDate={
          selectedDate
        }
        onEdit={(
          emp
        ) => {
          setSelectedEmp(
            emp
          );

          setOpenEdit(
            true
          );
        }}
        onDelete={
          handleDelete
        }
      />

      {/* ADD */}
      <Dialog
  open={
    openAdd
  }
  onOpenChange={
    setOpenAdd
  }
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Add Employee
      </DialogTitle>

      <DialogDescription>
        Fill employee details to add a new employee.
      </DialogDescription>
    </DialogHeader>

    <AddEmployeeForm
      onAdd={
        handleAdd
      }
    />
  </DialogContent>
</Dialog>

      {/* EDIT */}
      <EditEmployeeDialog
        open={
          openEdit
        }
        setOpen={
          setOpenEdit
        }
        employee={
          selectedEmp
        }
        setEmployee={
          setSelectedEmp as any
        }
        onSave={
          handleSave
        }
      />

      {/* ATTENDANCE */}
      <AttendanceDialog
        open={
          openAttendance
        }
        setOpen={
          setOpenAttendance
        }
        employees={
          employees
        }
        bulkAttendance={
          bulkAttendance
        }
        setBulkAttendance={
          setBulkAttendance
        }
        onSave={
          saveAttendance
        }
      />
    </div>
  );
}