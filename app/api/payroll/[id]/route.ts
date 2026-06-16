import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Payroll from "@/models/Payroll";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  await connectDB();

  const { id } =
    await params;

  const body =
    await req.json();

  const payroll =
    await Payroll.findOneAndUpdate(
      {
        employeeId: id,
      },
      {
        paid: body.paid,
      },
      {
        new: true,
        upsert: true,
      }
    );

  return NextResponse.json(
    payroll
  );
}