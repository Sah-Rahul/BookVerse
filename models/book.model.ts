import mongoose, { Schema, model, Document } from "mongoose";

export enum BookCategory {
  PHILOSOPHY = "Philosophy",
  TECHNOLOGY = "Technology",
  HISTORY = "History",
  SCIENCE = "Science",
  BIOGRAPHY = "Biography",
  BUSINESS = "Business",
  SELF_HELP = "Self-Help",
  FICTION = "Fiction",
}

export interface IBook extends Document {
  title: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  authorName: string;
  category: BookCategory;
  description?: string;
  createdAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    authorName: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      enum: Object.values(BookCategory),
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.models.Book || model<IBook>("Book", bookSchema);
