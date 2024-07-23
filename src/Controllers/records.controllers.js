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

  const user = await User.find({ userName });
  console.log(user);

  if (!user) {
    throw new ApiError(401, "No user Found");
  }

  //const book = await Book.find({ ISBN });
  const updatedBook = await Book.updateOne(
    { ISBN: ISBN },
    { $set: { isBorrowed: true } }
  );
  console.log(updatedBook);

  if (!user) {
    throw new ApiError(401, "No Book found");
  }

  const borrowing = new Record({
    userName,
    ISBN,
    isBorrowed: true,
    borrowDate: Date.now(),
  });
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

  const book = await Book.findOne({ ISBN });
  if (!book) {
    throw new ApiError(404, "Book Not Found");
  }
  console.log("Book from DB:", book);

  console.log("Book isBorrowed status before return check:", book.isBorrowed);

  if (!book.isBorrowed) {
    throw new ApiError(400, "Book was not borrowed");
  }

  // Retrieve and log user data
  const user = await User.findOne({ userName });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  console.log("User from DB:", user);

  // Retrieve and log record data
  const checkIfMatched = await Record.findOne({
    userName,
    ISBN,
    returnDate: null,
  });

  if (!checkIfMatched) {
    throw new ApiError(400, "No matching record found for this book borrow");
  }
  console.log("Record from DB:", checkIfMatched);

  // Update the book status and save
  book.isBorrowed = false;
  console.log("Updating book status to:", book.isBorrowed);
  await book.save();

  // Update the record with return date and save
  checkIfMatched.returnDate = Date.now();
  await checkIfMatched.save();

  return res
    .status(200)
    .json(new ApiResponse(200, checkIfMatched, "Book Returned Successfully"));
});

export { borrowBook, returnBook };
