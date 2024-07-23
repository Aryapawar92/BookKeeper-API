import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/User.models.js";
import { Book } from "../Models/Books.models.js";
import { Record } from "../Models/Records.models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const borrowBook = asyncHandler(async (req, res) => {
  //take userid and book isbn
  //check user or book isbn
  //check if book available or not
  //save the book
  //make the record in the database

  const { userName, ISBN } = req.body;

  if (!userName || !ISBN) {
    throw new ApiError(401, "Enter Username or ISBN");
  }

  const user = User.findById({ userName });

  if (!user) {
    throw new ApiError(401, "No user Found");
  }

  const book = await Book.findById({ ISBN });

  if (!user) {
    throw new ApiError(401, "No Book found");
  }

  book.isBorrowed = true;
  await book.save();

  const borrowing = new Record({ userName, ISBN });
  await borrowing.save();

  return res
    .status(200)
    .json(new ApiResponse(200, borrowing, "Book Borrowed Successfully"));
});

const returnBook = asyncHandler(async (req, res) => {
  //take user id and book id
  //check if user has borrowed book or not
  //if not give error
  //if yes then make changes for book borrowing

  const { userName, ISBN } = req.body;

  const book = await Book.findById({ ISBN });

  if (!book) {
    throw new ApiError(401, "Book Not found");
  }

  if (!book.isBorrowed) {
    throw new ApiError(401, "Book was never Borrowed");
  }

  const user = await User.findById({ userName });

  if (!user) {
    throw new ApiError(401, "User not Found");
  }

  const checkIfMatched = await Record.findOne({
    userName,
    ISBN,
    returnDate: null,
  });

  if (!checkIfMatched) {
    throw new ApiError(401, "User has not borrowed the book");
  }

  book.isBorrowed = false;
  await book.save();

  checkIfMatched.returnDate = Date.now();
  await checkIfMatched.save();

  return res
    .status(200)
    .json(new ApiResponse(200, checkIfMatched, "Book Returned Successfully"));
});

export { borrowBook, returnBook };
