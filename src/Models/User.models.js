import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    }

},{timestamps:true})

export const User = mongoose.model('User',userSchema)