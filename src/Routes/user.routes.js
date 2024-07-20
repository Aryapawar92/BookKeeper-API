import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/user.controllers.js";
import  verify  from "../Middlewares/auth.middleware.js";

const router  = Router()

router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route('/logoutuser').post(verify,logoutUser)

export default router