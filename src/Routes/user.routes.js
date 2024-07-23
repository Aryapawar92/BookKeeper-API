import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/user.controllers.js";
import verify from "../Middlewares/auth.middleware.js";
import { searchBook } from "../Controllers/books.controllers.js";
import userChecked from "../Middlewares/user.middleware.js";

const router = Router();

//for user
router.route("/registeruser").post(registerUser);
router.route("/loginuser").post(loginUser);
router.route("/logoutuser").post(verify, logoutUser);

router.route("/searchbook").get(userChecked, searchBook);

export default router;
