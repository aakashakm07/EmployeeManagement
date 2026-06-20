import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const date =
      searchParams.get("date");

    const data =
      await Attendance.find({
        date,
      });

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    if (
      !body.records ||
      !Array.isArray(body.records)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "records array is required",
        },
        {
          status: 400,
        }
      );
    }

    if (body.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No attendance records provided",
        },
        {
          status: 400,
        }
      );
    }

    const operations =
      body.records.map(
        (record: {
          employeeId: string;
          date: string;
          status:
            | "Present"
            | "Absent";
        }) => ({
          updateOne: {
            filter: {
              employeeId:
                record.employeeId,
              date: record.date,
            },
            update: {
              $set: {
                employeeId:
                  record.employeeId,
                date: record.date,
                status:
                  record.status,
              },
            },
            upsert: true,
          },
        })
      );

    await Attendance.bulkWrite(
      operations
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Attendance saved successfully",
        count:
          body.records.length,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "ATTENDANCE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}