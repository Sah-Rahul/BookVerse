import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const revenue = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const data = revenue.map(r => ({
    name: days[r._id - 1],
    orders: r.orders,
  }));

  return NextResponse.json({ success: true, data });
}