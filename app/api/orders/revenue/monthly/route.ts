import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const revenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" }, 
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const data = revenue.map(r => ({
      name: months[r._id - 1],
      revenue: r.revenue,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Monthly revenue error:", error);
    return NextResponse.json({ success: false, data: [] });
  }
}