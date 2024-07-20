import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true
    },
    password:{
        type:String,
        unique:true,
        required:true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim: true
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    },
    refreshToken:{
        type:String
    },
    accessToken:{
        type:String
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    if(!this.isModified("email")) return next();

    this.password = await bcrypt.hash(this.password,10)
    //this.email = await bcrypt.hash(this.email,10)
    //console.log(this.password);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email: this.email,
        userName: this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }

    )
}

export const User = mongoose.model('User',userSchema)