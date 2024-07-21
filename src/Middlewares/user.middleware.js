import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";

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

export default userChecked