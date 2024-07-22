import mongoose, { Schema } from "mongoose";
import { Book } from "./Books.models";
import { User } from "./User.models";

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
    borrowDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Record = mongoose.model("Record", recordSchema);
