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
        console.log('User:', req.user);
    
        req.user = user
    
        next()
    } catch (error) {
        console.error("ERROR:" , error);
    }
})

const userChecked = asyncHandler(async (req,res,next) => {
    try {
        const {role} = req.user
        console.log(`req.user : ${role}`);
        
    
        if(!role){
            throw new ApiError(401,"User not Checked")
        }
    
        if(role !== "user"){
            throw new ApiError(403, "Access denied: user Only")
        }

        next()
    } catch (error) {
        console.error("ERROR:",error);
    }
})

export default verify