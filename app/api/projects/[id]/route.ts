
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

// ======================
// UPDATE PROJECT
// ======================

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      customer,
      contact,
      place,
      product,
      amount,
      received,
    } = body;

    const status =
      Number(received) >= Number(amount)
        ? "PAID"
        : "PENDING";

    const updatedProject =
      await Project.findByIdAndUpdate(
        id,
        {
          customer,
          contact,
          place,
          product,
          amount: Number(amount),
          received: Number(received),
          status,
        },
        {
          returnDocument: "after",
        }
      );

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================
// DELETE PROJECT
// ======================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedProject =
      await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}

