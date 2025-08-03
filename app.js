const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const cors = require("cors");
app.use(cors());

const connectDB = require("./db/db");
connectDB();

const  userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

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

module.exports = app;