import {
  NextResponse,
} from "next/server";

import {
  connectDB,
} from "@/lib/mongodb";

import Employee from "@/models/Employee";

export async function PUT(
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

  const body =
    await req.json();

  const { id } =
    await params;

  const employee =
    await Employee.findByIdAndUpdate(
      id,
      body,
      {
        returnDocument:
          "after",
      }
    );

  return NextResponse.json(
    employee
  );
}

export async function DELETE(
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

  await Employee.findByIdAndDelete(
    id
  );

  return NextResponse.json({
    success: true,
  });
}