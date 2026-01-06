import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { Book } from "@/models/book.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    console.log("=== Verify Payment API Called ===");
    
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID required" },
        { status: 400 }
      );
    }

    console.log("Retrieving Stripe session:", sessionId);

 
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Stripe session status:", session.payment_status);

    await connectDB();

  
    const order = await Order.findOne({ paymentIntentId: sessionId });

    if (!order) {
      console.error("Order not found for session:", sessionId);
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    console.log("Order found:", order._id, "Current status:", order.paymentStatus);

    
    if (session.payment_status === "paid") {
      if (order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.status = "processing";
        await order.save();

       
        for (const item of order.items) {
          await Book.findByIdAndUpdate(item.bookId, {
            $inc: { stock: -item.quantity },
          });
          console.log(`Updated stock for book: ${item.bookId}`);
        }

        console.log(`✅ Order ${order._id} payment confirmed and stock updated`);
      } else {
        console.log("Order already marked as paid");
      }

      return NextResponse.json({
        success: true,
        order,
        paymentStatus: session.payment_status,
        message: "Payment verified successfully",
      });
    } else {
      console.log("Payment not completed yet. Status:", session.payment_status);
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
        paymentStatus: session.payment_status,
      });
    }
  } catch (error: any) {
    console.error("=== Verify Payment Error ===");
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}