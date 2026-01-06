import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("items.bookId")  
      .populate("userId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { items, shippingAddress, totalAmount } = await req.json();

    await connectDB();

    // Create order
    const order = await Order.create({
      items: items.map((item: any) => ({
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      shippingAddress,
      totalAmount,
      paymentStatus: "pending",
      status: "pending",
    });

    console.log("Order created:", order._id);

   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "npr",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-failed`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

  
    order.paymentIntentId = session.id;
    await order.save();

    console.log("Stripe session created:", session.id);

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "orderId and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("items.bookId");

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Could not update order" },
      { status: 500 }
    );
  }
}