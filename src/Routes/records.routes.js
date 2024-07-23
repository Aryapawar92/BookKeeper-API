import { Router } from "express";
import userChecked from "../Middlewares/user.middleware";
import { borrowBook, returnBook } from "../Controllers/records.controllers";

const router = Router();

router.route("/borrowbook").post(userChecked, borrowBook);
router.route("/returnbook").post(userChecked, returnBook);
