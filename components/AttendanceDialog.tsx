"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;

  employees: Employee[];

  bulkAttendance: Record<
    string,
    boolean
  >;

  setBulkAttendance: (
    v: Record<string, boolean>
  ) => void;

  onSave: () => void;
};

export default function AttendanceDialog({
  open,
  setOpen,
  employees,
  bulkAttendance,
  setBulkAttendance,
  onSave,
}: Props) {
  const handleAttendanceChange = (
    employeeId: string,
    value: boolean
  ) => {
    setBulkAttendance({
      ...bulkAttendance,
      [employeeId]: value,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Mark Attendance
          </DialogTitle>

          <DialogDescription>
            Mark attendance for all
            employees and click Save.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[450px] overflow-y-auto space-y-3">
          {employees.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-6">
              No employees found
            </div>
          ) : (
            employees.map((emp) => (
              <div
                key={emp._id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">
                    {emp.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {emp.site}
                  </p>

                  <p className="text-xs text-muted-foreground capitalize">
                    {emp.job}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Present */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${emp._id}`}
                      checked={
                        bulkAttendance[
                          emp._id || ""
                        ] === true
                      }
                      onChange={() =>
                        handleAttendanceChange(
                          emp._id || "",
                          true
                        )
                      }
                    />

                    <span className="text-green-600 font-medium">
                      Present
                    </span>
                  </label>

                  {/* Absent */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${emp._id}`}
                      checked={
                        bulkAttendance[
                          emp._id || ""
                        ] === false
                      }
                      onChange={() =>
                        handleAttendanceChange(
                          emp._id || "",
                          false
                        )
                      }
                    />

                    <span className="text-red-600 font-medium">
                      Absent
                    </span>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button onClick={onSave}>
            Save Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}