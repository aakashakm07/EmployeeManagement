import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

type ProjectStatus =
  | "PAID"
  | "PENDING";

function getStatus(
  amount: number,
  received: number
): ProjectStatus {
  return received >= amount
    ? "PAID"
    : "PENDING";
}

// GET all projects
export async function GET() {
  try {
    await connectDB();

    const projects =
      await Project.find().sort({
        createdAt: -1,
      });

    return NextResponse.json(
      projects
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Failed to fetch projects",
      },
      {
        status: 500,
      }
    );
  }
}

// POST new project
export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const {
      customer,
       contact,
        place,
      product,
      amount,
      received,
    } = body;

    if (
      !customer ||
  !contact ||
  !place ||
  !product || 
      amount === undefined ||
      received === undefined
    ) {
      return NextResponse.json(
        {
          message:
            "All fields required",
        },
        {
          status: 400,
        }
      );
    }

    const project =
  await Project.create({
    customer,
    contact,
    place,
    product,

    amount: Number(amount),

    received: Number(received),

    date:
      new Date().toLocaleDateString(),

    status: getStatus(
      Number(amount),
      Number(received)
    ),
  });
    return NextResponse.json(
      project,
      {
        status: 201,
      }
    );
  } catch (error: any) {
  console.log(error);

  return NextResponse.json(
    {
      success: false,
      error: error.message,
    },
    {
      status: 500,
    }
  );
}
}