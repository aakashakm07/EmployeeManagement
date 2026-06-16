import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Employee from "@/models/Employee";
import Attendance from "@/models/Attendance";
import Payroll from "@/models/Payroll";

export async function GET() {
  try {
    await connectDB();

    const employees =
      await Employee.find();

    const payrolls =
      await Payroll.find();

    const payrollMap = new Map(
      payrolls.map((p) => [
        p.employeeId.toString(),
        p.paid,
      ])
    );

    const records =
      await Promise.all(
        employees.map(
          async (employee) => {
            const attendances =
              await Attendance.find({
                employeeId:
                  employee._id,
              });

            const present =
              attendances.filter(
                (a) =>
                  a.status ===
                  "Present"
              ).length;

            const absent =
              attendances.filter(
                (a) =>
                  a.status ===
                  "Absent"
              ).length;

            const salary =
              present *
              employee.salary;

            const paid =
              payrollMap.get(
                employee._id.toString()
              ) || 0;

            return {
              id: employee._id,

              name:
                employee.name,

              contact:
                employee.contact,

              site:
                employee.site,

              role:
                employee.job,

              present,

              absent,

              salary,

              paid,

              dues:
                salary - paid,
            };
          }
        )
      );

    return NextResponse.json(
      records
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch records",
      },
      { status: 500 }
    );
  }
}