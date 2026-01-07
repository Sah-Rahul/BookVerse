import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const orders = await Order.find({ paymentStatus: "paid" });

    const booksMap = new Map();

    orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        const bookId = item.bookId?.toString() || item._id;
        if (booksMap.has(bookId)) {
          booksMap.get(bookId).purchaseCount += item.quantity;
        } else {
          booksMap.set(bookId, {
            _id: bookId,
            title: item.title,
            price: item.price,
            image: item.image,
            purchaseCount: item.quantity,
          });
        }
      });
    });

    const books = Array.from(booksMap.values());

    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
