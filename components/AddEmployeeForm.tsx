"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Employee } from "@/types/employee";
import { jobRates } from "@/data/employeeConfig";

type Props = {
  onAdd: (
    emp: Employee
  ) => void;
};

export default function AddEmployeeForm({
  onAdd,
}: Props) {
  const [form, setForm] =
    useState({
      name: "",
      contact: "",
      site: "",
      job: "mistree" as
        | "mistree"
        | "labour",
      salary: "",
    });

  const handleSubmit =
    () => {
      if (
        !form.name ||
        !form.contact ||
        !form.site
      )
        return;

      onAdd({
        name: form.name,
        contact:
          form.contact,
        site: form.site,
        job: form.job,
        salary:
          Number(
            form.salary
          ) ||
          jobRates[
            form.job
          ],
      });

      setForm({
        name: "",
        contact: "",
        site: "",
        job: "mistree",
        salary: "",
      });
    };

  return (
    <div className="space-y-4">

      <Input
        placeholder="Employee Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name:
              e.target
                .value,
          })
        }
      />

      <Input
        placeholder="Contact Number"
        value={
          form.contact
        }
        onChange={(e) =>
          setForm({
            ...form,
            contact:
              e.target
                .value,
          })
        }
      />

      <Input
        placeholder="Site Name"
        value={form.site}
        onChange={(e) =>
          setForm({
            ...form,
            site:
              e.target
                .value,
          })
        }
      />

      <Select
        value={form.job}
        onValueChange={(
          val
        ) =>
          setForm({
            ...form,
            job: val as
              | "mistree"
              | "labour",
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Job Role" />
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
        placeholder="Salary ₹"
        value={
          form.salary
        }
        onChange={(e) =>
          setForm({
            ...form,
            salary:
              e.target
                .value,
          })
        }
      />

      <Button
        className="w-full"
        onClick={
          handleSubmit
        }
      >
        Add Employee
      </Button>
    </div>
  );
}