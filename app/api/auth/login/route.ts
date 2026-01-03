import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    return NextResponse.json({
      success: true,
      message:`Welcome back ${user.name}`,
      user,
      token,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
