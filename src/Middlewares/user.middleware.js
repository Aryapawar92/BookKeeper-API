import { User } from "../Models/User.models.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const userChecked = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer", " ");

    //console.log(token);

    if (!token) {
      throw new ApiError(401, "Invalid Token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const role = decodedToken.role;
    console.log(`Decoded role: ${role}`);

    //const { role } = req.body;
    console.log(`req.user : ${role}`);

    if (!role) {
      throw new ApiError(401, "User not Checked");
    }

    if (role !== "user") {
      throw new ApiError(403, "Access denied: user Only");
    }

    next();
  } catch (error) {
    console.error("ERROR:", error);
  }
});

export default userChecked;
