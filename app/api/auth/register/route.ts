import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { success: true, message: "User registered" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );
  }
}
