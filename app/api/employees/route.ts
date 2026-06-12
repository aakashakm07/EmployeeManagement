import {
  NextResponse,
} from "next/server";

import {
  connectDB,
} from "@/lib/mongodb";

import Employee from "@/models/Employee";

export async function GET() {
  await connectDB();

  const employees =
    await Employee.find();

  return NextResponse.json(
    employees
  );
}

export async function POST(
  req: Request
) {
  await connectDB();

  const body =
    await req.json();

  const employee =
    await Employee.create(
      body
    );

  return NextResponse.json(
    employee
  );
}