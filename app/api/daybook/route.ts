import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";


// ====================
// GET ALL
// ====================

export async function GET() {
  try {
    await connectDB();

    const transactions =
      await Transaction.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      transactions
    );
  } catch (error) {
    console.error(
      "GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch transactions",
      },
      {
        status: 500,
      }
    );
  }
}


// ====================
// CREATE
// ====================

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const {
      party,
      type,
      amount,
      category,
      time,
    } = body;

    if (
      !party ||
      !type ||
      !amount ||
      !category ||
      !time
    ) {
      return NextResponse.json(
        {
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const transaction =
      await Transaction.create({
        party,
        type,
        amount,
        category,
        time,
      });

    return NextResponse.json(
      transaction,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to create transaction",
      },
      {
        status: 500,
      }
    );
  }
}