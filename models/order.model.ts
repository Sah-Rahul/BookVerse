import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  book: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "processing" | "delivered" | "cancelled";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["processing", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order ||  model<IOrder>("Order", orderSchema);
