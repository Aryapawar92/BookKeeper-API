import express from "express";
import CONNECT_DB from "./DB/db.js";
import { app } from "./app.js";

CONNECT_DB().then(
    app.listen(process.env.PORT,() => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    }),
    app.on("error",(error) => {
        console.log("Error:",error);
        throw error;
    })
)
.catch(
    (error) => {
        console.log("MONGO db connection failed !!! ", error);
    }
)



