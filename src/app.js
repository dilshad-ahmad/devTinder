const express = require("express");
 const  connectDB = require("./config/database");
const app = express();
const User =require("./models/user");



app.post("/signup",  async (req,res) => {
  //crating a new instance of user model
    const user = new User ({
        firstName:"Anand",
        lastName:"pal",
        emailId:"pal@gmail.com",
        password:"anand@2003",
    });

    try {
      
    await user.save();
    res.send("User send sucessfully !")


    } catch(err) {
      res.status(400).send("Error saving the user" + err.message)

    }
    

});


connectDB()
  .then(() => {
    console.log("Database connection established...")
    
app.listen(3000,( ) => {
    console.log("Server is sucessfully listening on PORT 3000...")

})
  })
  .catch((err) => {
    console.log("database can not be connected")

  })



