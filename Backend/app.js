const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,               // Allow cookies / Authorization headers
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow Authorization header
}));
const connectDB = require("./db/db");
connectDB();

const  userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

app.get("/",(req,res)=>{
  res.send("Hello World");
});


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Body:", req.body);
  next();
});
app.use("/users",userRoutes);

app.use("/captain",captainRoutes);
app.use("/maps",mapsRoutes);
app.use("/rides",rideRoutes);

module.exports = app;