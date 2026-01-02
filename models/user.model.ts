import mongoose, { Schema, model, Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "user" | "admin"
  isBlocked: boolean
  createdAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const User = mongoose.models.User || model<IUser>("User", userSchema)
