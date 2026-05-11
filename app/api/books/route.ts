import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/book.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CREATE BOOK
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const priceRaw = formData.get("price");
    const discountRaw = formData.get("discount");
    const authorName = formData.get("authorName");
    const stockRaw = formData.get("stock");
    const category = formData.get("category");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    // validation
    if (
      typeof title !== "string" ||
      typeof authorName !== "string" ||
      typeof category !== "string" ||
      !(imageFile instanceof File) ||
      priceRaw === null ||
      stockRaw === null
    ) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid required fields" },
        { status: 400 },
      );
    }

    const price = Number(priceRaw);
    const discount = discountRaw ? Number(discountRaw) : 0;
    const stock = Number(stockRaw);

    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid price" },
        { status: 400 },
      );
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
      return NextResponse.json(
        { success: false, message: "Invalid discount (0-100 allowed)" },
        { status: 400 },
      );
    }

    if (isNaN(stock) || stock < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid stock value" },
        { status: 400 },
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "books" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const imageUrl = uploadResponse.secure_url;

    const finalPrice = price - (price * discount) / 100;

    const book = await Book.create({
      title,
      price,
      discount,
      finalPrice,
      authorName,
      stock,
      category,
      description: typeof description === "string" ? description : "",
      image: imageUrl,
    });

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Book not created" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const books = await Book.find();

    return NextResponse.json({ success: true, data: books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch books" },
      { status: 500 },
    );
  }
}
