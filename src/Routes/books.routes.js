import mongoose from "mongoose";
import { Router } from "express";
import { addBook, deleteBook, updateBook } from "../Controllers/books.controllers.js";


const router = Router()

router.route('/addbook').post(addBook)
router.route('/deletebook').post(deleteBook)
router.route('/updatebook').post(updateBook)

export default router