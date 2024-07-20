import { User } from "../Models/User.models.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'

const verify = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer", " ")
    
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
    
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken._id).select("-password -refreshToken")
    
        
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user
    
        next()
    } catch (error) {
        console.error("ERROR:" , error);
    }
})

export default verify