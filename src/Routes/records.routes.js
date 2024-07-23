import { Router } from "express";
import userChecked from "../Middlewares/user.middleware.js";
import { borrowBook, returnBook } from "../Controllers/records.controllers.js";

const router = Router();

router.route("/borrowbook").post(userChecked, borrowBook);
router.route("/returnbook").post(userChecked, returnBook);

export default router;
