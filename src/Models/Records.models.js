import mongoose, { Schema } from "mongoose";
import { Book } from "./Books.models.js";
import { User } from "./User.models.js";

const recordSchema = new mongoose.Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: Book,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    ISBN: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: Date,
      required: false,
      default: null,
    },
    returnDate: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

export const Record = mongoose.model("Record", recordSchema);
