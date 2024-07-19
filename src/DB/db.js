import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const CONNECT_DB = async () =>{
    try {
        const connect = await mongoose.connect(`${process.env.MongoDB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected !! DB HOST:${connect.connection.host}` );
        
    } catch (error) {
        console.log("MongoDB Connection Error!!",error);
        process.exit(1);
    }

}

export default CONNECT_DB