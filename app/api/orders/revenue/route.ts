import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

// TOTAL REVENUE
export async function GET(req: Request) {
  try {
    await connectDB();

    const orders = await Order.find({ paymentStatus: "paid" });

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    return NextResponse.json(
      { success: true, revenue: totalRevenue },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch revenue" },
      { status: 500 }
    );
  }
}