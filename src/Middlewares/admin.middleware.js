import { User } from "../Models/User.models.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const adminChecked = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization").replace("Bearer", " ");

    if (!token) {
      throw new ApiError(400, "Invalid Token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const role = decodedToken.role;

    //const {role} = req.user
    console.log(`req.user : ${role}`);

    if (!role) {
      throw new ApiError(401, "User not Checked");
    }

    if (role !== "admin") {
      throw new ApiError(403, "Access denied: Admin Only");
    }

    next();
  } catch (error) {
    console.error("ERROR:", error);
  }
});

export default adminChecked;
