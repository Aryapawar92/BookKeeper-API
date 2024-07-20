import { Router } from "express";
import { addBook, deleteBook, updateBook } from "../Controllers/books.controllers.js";
import adminChecked from "../Middlewares/admin.middleware.js";
import verify from "../Middlewares/auth.middleware.js";


const router = Router()



router.route('/addbook').post(verify,adminChecked,addBook)
router.route('/deletebook').post(verify,adminChecked,deleteBook)
router.route('/updatebook').post(verify,adminChecked,updateBook)

export default router