const express = require("express");

const app = express()

 const {adminAuth} =require('./middlewares/auth')

 app.use("/admin",adminAuth);

app.get("/user",(req,res) => {
    res.send("User data send ")

});

app.get("/admin",(req,res) => {
    res.send("Admin data send successfully")
})

app.get("/admin/getAllData", (req,res) => {
    res.send("All data send ")
});

app.get("/admin/delteUser", (req,res) => {
    res.send("All data are delted ") 
})





app.listen(3000,( ) => {
    console.log("Server is sucessfully listening on PORT 3000...")

})