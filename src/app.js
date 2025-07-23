const express = require("express");
const connectDB = require("./config/database");
const app = express();

const  cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser()); 

const authRouter =require("./routes/auth") ;
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);


connectDB()
  .then(() => {
    console.log("Database connection established...")

    app.listen(3000, () => {
      console.log("Server is sucessfully listening on PORT 3000...")

    })
  })
  .catch((err) => {
    console.log("database can not be connected")

  })



