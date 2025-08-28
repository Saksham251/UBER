const cors = require("cors");
const express = require("express");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://kh8jgt53-5173.inc1.devtunnels.ms"  
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.options("*", cors());  // preflight fix
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const connectDB = require("./db/db");
connectDB();

const userRoutes = require("./routes/user.routes");
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