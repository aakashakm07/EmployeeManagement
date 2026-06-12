"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";

type Props = {
  open: boolean;
  setOpen: (
    v: boolean
  ) => void;

  employees: Employee[];

  bulkAttendance: Record<
    string,
    boolean
  >;

  setBulkAttendance: (
    v: Record<
      string,
      boolean
    >
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
  return (
    <Dialog
      open={open}
      onOpenChange={
        setOpen
      }
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
  <DialogTitle>
    Mark Attendance
  </DialogTitle>

  <DialogDescription>
    Mark employee attendance for the selected date.
  </DialogDescription>
</DialogHeader>

        <div className="space-y-3 max-h-[350px] overflow-auto">

          {employees.map(
            (emp) => (
              <div
                key={
                  emp._id
                }
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">
                    {
                      emp.name
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {
                      emp.site
                    }
                  </p>
                </div>

                <div className="flex gap-5">

                  <label className="flex items-center gap-1">

                    <input
                      type="radio"
                      name={`att-${emp._id}`}
                      checked={
                        bulkAttendance[
                          emp._id ||
                            ""
                        ] ===
                        true
                      }
                      onChange={() =>
                        setBulkAttendance(
                          {
                            ...bulkAttendance,
                            [
                              emp._id ||
                                ""
                            ]:
                              true,
                          }
                        )
                      }
                    />

                    P
                  </label>

                  <label className="flex items-center gap-1">

                    <input
                      type="radio"
                      name={`att-${emp._id}`}
                      checked={
                        bulkAttendance[
                          emp._id ||
                            ""
                        ] ===
                        false
                      }
                      onChange={() =>
                        setBulkAttendance(
                          {
                            ...bulkAttendance,
                            [
                              emp._id ||
                                ""
                            ]:
                              false,
                          }
                        )
                      }
                    />

                    A
                  </label>
                </div>
              </div>
            )
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={
              onSave
            }
          >
            Save Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}