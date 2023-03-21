const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const hotelRoute = require("./routes/hotels");
const roomRoute = require("./routes/rooms");
const cookiePasrser = require("cookie-parser");

const app = express();

const connect = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/booking");
        console.log("Connected to mongDB");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!");
});

app.use(express.json());
app.use(cookiePasrser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMesaage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMesaage,
        stack: err.stack
    })
})

app.listen(8000, ()=>{
    connect();
    console.log("Server started successfully on port 8000");
})