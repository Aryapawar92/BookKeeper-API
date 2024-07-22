import { asyncHandler } from "../Utils/AsyncHandler.js";
import { Book } from "../Models/Books.models.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const addBook = asyncHandler(async (req, res) => {
  //take info from the body
  //check them condition if they are there or not
  //check if existed or not
  //add in mongoose
  const { title, name, author, language, pageCount, ISBN } = req.body;

  if (!(title || name || ISBN)) {
    throw new ApiError(400, "Enter Title or Name.");
  }

  const existedBook = await Book.findOne({ ISBN });

  if (existedBook) {
    throw new ApiError(400, "Book Already Exists");
  }

  const newBook = await Book.create({
    title,
    name,
    author,
    language,
    pageCount,
    ISBN,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newBook, "Book Added Successfully"));
});

const deleteBook = asyncHandler(async (req, res) => {
  //Take ISBN from body
  //find the book
  //if not able then throw error
  //if yes then delete
  const { ISBN } = req.body;

  if (!ISBN) {
    throw new ApiError(400, "ISBN is Required");
  }

  const deleteBook = await Book.findOneAndDelete({ ISBN });

  if (!deleteBook) {
    throw new ApiError(404, "Book Deletion Failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteBook, "Book Deleted Successfully"));
});

const updateBook = asyncHandler(async (req, res) => {
  //FindBook by ISBN
  //If not Available then error
  //Then update that book
  //and save it

  const { ISBN, newTitle, newLanguage, newPageCount } = req.body;

  if (!ISBN) {
    throw new ApiError(400, "ISBN is Required");
  }

  const updated = await Book.findOneAndUpdate(
    { ISBN },
    {
      $set: {
        title: newTitle,
        language: newLanguage,
        pageCount: newPageCount,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log("Book Updated");

  if (!updated) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateBook, "Book Updated Successully"));
});

const searchBook = asyncHandler(async (req, res) => {
  //take book name from parameter
  //find book in the database if available show or error

  const bookName = req.query.book;
  console.log(bookName);

  if (!bookName) {
    throw new ApiError(400, "Please Enter Book Name");
  }

  const findBook = await Book.findOne({ name: bookName });

  if (!findBook) {
    throw new ApiError(400, "No book Found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, findBook, "Book Found Successfully"));
});

export { addBook, deleteBook, updateBook, searchBook };
