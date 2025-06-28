import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface apiDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  api_key: string;
  expiresAt: Date;
  isActive: boolean;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const apiSchema = new mongoose.Schema<apiDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    api_key: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: thirtyDaysFromNow,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ApiModel = mongoose.model<apiDocument>("Api", apiSchema);
