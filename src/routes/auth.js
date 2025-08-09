const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation'); //".." Because one folder deep 
const User = require("../models/user");
const bcrypt = require("bcrypt")



//Signup API
authRouter.post("/signup", async (req, res) => {
  console.log("Signup sucessfully checked")
  
   try {
    //validation of data 
    validateSignUpData(req);

    const {firstName,lastName,emailId,password} = req.body

    //Encrypt the password 
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash)

    //creating a  new instance of the user model 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,

    });


    await user.save();
    res.send("User send sucessfully !")


  } catch (err) {
    res.status(400).send("Error:" + err.message)

  }


});



//Login API 

authRouter.post("/login",async(req,res) => {
  try{  
    const {emailId,password} =req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user) {
      throw new Error ("EmailId is not present in DB")
    }

       const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid) {
      //Create a JWT Token

      const token = await user.getJWT();

            res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
    
      
      res.send("Login sucessful!!")
    }else {
      throw new Error ("Password id not valid ")
    }


  } catch (err) {
    res.status(400).send("Error:" + err.message)
  }
})

//Logout API 
authRouter.post("/logout", async (req,res) => {
  res.cookie("token",null, {
    expires: new Date(Date.now())
  });
  res.send("Logout sucessfully")

})






module.exports = authRouter ;