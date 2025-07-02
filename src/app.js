const express = require("express");

const app = express()




app.get("/user",(req,res) => {
    res.send({firstname:"Dilshad",lastname:"Ahmad"})
});

app.post("/user", (req,res) => {
    res.send("Data sucessfully saved in a database")

});

app.delete("/user", (req,res) => {
    res.send("Data are Deleted ")
});

//PUT is used in HTTP to update whole data 
app.put("/user/data", (req,res) => {
    res.send({firstname:"Naushad",lastname:"Ahmad"})
});

//PATCH is used to update partial data 
app.patch("/user/data",(req,res) => {
    console.log(req.body);
    res.send({firstname:"Naushad",lastname:"Ali"})
})



//This will match all the all HTTP method API call to /test 
app.use("/test", (req,res) => {
    res.send("Test is checked ")

});





app.listen(3000,( ) => {
    console.log("Server is sucessfully listening on PORT 3000...")

})