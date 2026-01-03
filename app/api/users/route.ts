import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const book = await User.find();

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Book not created" },
      { status: 500 }
    );
  }
}