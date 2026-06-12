"use client";

import {
  Search,
  Plus,
  CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  setSearch: (
    v: string
  ) => void;
  siteFilter: string;
  setSiteFilter: (
    v: string
  ) => void;
  sites: string[];
  selectedDate: string;
  setSelectedDate: (
    v: string
  ) => void;
  onAttendance: () => void;
  onAdd: () => void;
};

export default function EmployeeToolbar({
  search,
  setSearch,
  siteFilter,
  setSiteFilter,
  sites,
  selectedDate,
  setSelectedDate,
  onAttendance,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-between mb-6">

      <div className="flex flex-wrap gap-3">

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />

          <Input
            className="pl-9 w-52"
            placeholder="Search employee"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <Select
          value={siteFilter}
          onValueChange={
            setSiteFilter
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {sites.map((s) => (
              <SelectItem
                key={s}
                value={s}
              >
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
        />
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={
            onAttendance
          }
        >
          <CalendarCheck
            size={16}
            className="mr-2"
          />
          Attendance
        </Button>

        <Button
          onClick={onAdd}
        >
          <Plus
            size={16}
            className="mr-2"
          />
          Add Employee
        </Button>
      </div>
    </div>
  );
}