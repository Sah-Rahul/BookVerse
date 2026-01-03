import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/book.model";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const book = await Book.findById(params.id);

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: book }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB();
    const body = await req.json();

    const book = await Book.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: book });
  } catch {
    return NextResponse.json(
      { success: false, message: "Book not updated" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const book = await Book.findByIdAndDelete(params.id);

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Book deleted" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Book not deleted" },
      { status: 500 }
    );
  }
}
