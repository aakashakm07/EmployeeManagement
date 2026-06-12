"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types/employee";

type Props = {
  open: boolean;
  setOpen: (
    v: boolean
  ) => void;
  employee:
    | Employee
    | null;
  setEmployee: (
    e: Employee
  ) => void;
  onSave: () => void;
};

export default function EditEmployeeDialog({
  open,
  setOpen,
  employee,
  setEmployee,
  onSave,
}: Props) {
  if (!employee)
    return null;

  return (
    <Dialog
      open={open}
      onOpenChange={
        setOpen
      }
    >
      <DialogContent>
  <DialogHeader>
    <DialogTitle>
      Edit Employee
    </DialogTitle>

    <DialogDescription>
      Update employee information.
    </DialogDescription>
  </DialogHeader>

  <div className="space-y-4">
    <Input
      value={
        employee.name
      }
      onChange={(e) =>
        setEmployee(
          {
            ...employee,
            name:
              e.target
                .value,
          }
        )
      }
    />

          <Input
            value={
              employee.contact
            }
            onChange={(e) =>
              setEmployee(
                {
                  ...employee,
                  contact:
                    e.target
                      .value,
                }
              )
            }
          />

          <Input
            value={
              employee.site
            }
            onChange={(e) =>
              setEmployee(
                {
                  ...employee,
                  site:
                    e.target
                      .value,
                }
              )
            }
          />

          <Select
            value={
              employee.job
            }
            onValueChange={(
              v
            ) =>
              setEmployee(
                {
                  ...employee,
                  job: v as
                    | "mistree"
                    | "labour",
                }
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="mistree">
                Mistree
              </SelectItem>

              <SelectItem value="labour">
                Labour
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={
              employee.salary
            }
            onChange={(e) =>
              setEmployee(
                {
                  ...employee,
                  salary:
                    Number(
                      e
                        .target
                        .value
                    ),
                }
              )
            }
          />
        </div>

        <DialogFooter>
          <Button
            onClick={
              onSave
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}