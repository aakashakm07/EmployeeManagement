import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import mongoose from "mongoose";

// ======================
// GET SINGLE
// ======================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const transaction =
      await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE
// ======================

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const updated =
      await Transaction.findByIdAndUpdate(
        id,
        body,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!updated) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE
// ======================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("DELETE ID:", id);

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          message: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const deleted =
      await Transaction.findByIdAndDelete(
        id
      );

    if (!deleted) {
      return NextResponse.json(
        {
          message:
            "Transaction not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}