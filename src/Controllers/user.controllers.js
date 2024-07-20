import { asyncHandler } from "../Utils/AsyncHandler.js";
import {ApiError} from "../Utils/ApiError.js"
import { User } from "../Models/User.models.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}

    } catch (error) {
        console.error("Error:",error);
        throw new ApiError(400,"Error while accessing the token")
    }
}



const registerUser = asyncHandler(async (req,res) => {
    //take input as username email password 
    //check if user is available
    //if not, create user 
    //return success

    const {userName, password, email} = req.body;

    console.log(password);

    if([userName,password,email].some((field) => field?.trim()) === ""){
        throw new ApiError(400 , "All fields are Required")
    }

    const existedUser = await User.findOne({
        $or: [{userName:userName.toLowerCase()},{email}]
    })

    if(existedUser){
        throw new ApiError(400, "User Already Exists")
    }

    //const lowerUsername = userName.toLowerCase()

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password
    })
    

    if(!user){
        throw new ApiError(400, "Couldnt create new Account")
    }

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(400,"Something Went Wrong!")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User Created Successfully!")
    )

})

const loginUser = asyncHandler(async (req,res) => {
    //take username and password
    //check if username exists
    //check password
    //then login

    const {email,password} = req.body

    if(!email || !password){
        throw new ApiError(400,"Username or Password Required")
    }

    const existingUser = await User.findOne({
        email
    })

    if(!existingUser){
        throw new ApiError(400,"No user Available")
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(400,"Password Invalid")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(existingUser._id);

    const loggedinUser = await User.findById(existingUser._id).select("-password  -refreshToken")
    console.log(loggedinUser);

    //console.log(refreshToken);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken" , refreshToken , options).json(
        new ApiResponse(200,{loggedinUser,refreshToken,accessToken},"User Logged In Successfully")
    )


})

const logoutUser = asyncHandler(async (req,res) => {
    //check user is loggedin
    //reset access token

    const loggedOut = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                accessToken: 1
            }
        },
        {
            new:true
        }
    ).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true,
        sameSite:'Strict'
    }

    res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
        new ApiResponse(200,loggedOut,"User Logged Out Successfully")
    )
} )

export {registerUser,loginUser,logoutUser}