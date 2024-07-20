import { Router } from "express";
import { registerAdmin, loginAdmin,logoutAdmin } from "../Controllers/user.controllers.js";
import  verify  from "../Middlewares/auth.middleware.js";

const router  = Router()

//for admin
router.route('/registeradmin').post(registerAdmin)
router.route('/loginadmin').post(loginAdmin)
router.route('/logoutadmin').post(verify,logoutAdmin)

export default router