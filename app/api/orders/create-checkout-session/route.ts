import { connectDB } from "@/lib/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    console.log("=== Checkout API Started ===");

    const body = await req.json();
    const { items, shippingAddress, totalAmount } = body;

    console.log("Received data:", {
      itemsCount: items?.length,
      totalAmount,
      hasAddress: !!shippingAddress,
      items: items,
      shippingAddress: shippingAddress,
    });

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in cart" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, message: "Shipping address is required" },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid total amount" },
        { status: 400 }
      );
    }

    await connectDB();
    console.log("✅ DB Connected");

    // Create order
    const orderData = {
      items: items.map((item: any) => ({
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
      totalAmount: totalAmount,
      paymentStatus: "pending",
      status: "pending",
    };

    console.log("Creating order with data:", orderData);

    const order = await Order.create(orderData);
    console.log("✅ Order created:", order._id);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    console.log("Base URL:", baseUrl);

    const lineItems = items.map((item: any) => {
      const amount = Math.round(item.price * 100);
      console.log(`Line item for ${item.title}: ${amount} paisa`);

      return {
        price_data: {
          currency: "npr",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: amount,
        },
        quantity: item.quantity,
      };
    });

    console.log("Creating Stripe session with line items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order-failed`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    console.log("✅ Stripe session created:", session.id);

    order.paymentIntentId = session.id;
    await order.save();
    console.log("✅ Order updated with payment intent");

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("=== Checkout Error ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error: " + error.message,
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe error: " + error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Checkout failed",
        error:
          process.env.NODE_ENV === "development" ? error.toString() : undefined,
      },
      { status: 500 }
    );
  }
}
