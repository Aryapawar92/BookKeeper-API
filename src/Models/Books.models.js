import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: Number,
      required: true,
      unique: true,
    },
    isBorrowed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
