import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/book.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const book = await Book.create(body);

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Book not created" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const book = await Book.find();

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Book not created" },
      { status: 500 }
    );
  }
}
