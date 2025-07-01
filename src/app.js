const express = require("express");

const app = express()




app.use("/hello", (req,res) => {
    res.send("Hello from server!")
}) ;

app.use("/test", (req,res) => {
    res.send("Test is checked ")

});

app.use("/" ,(req,res) => {
    res.send("Welcome to dashboard from Laddu");
    next();

})



app.listen(3000,( ) => {
    console.log("Server is sucessfully listening on PORT 3000...")

})