const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require("bcrypt")


app.use(express.json());




app.post("/signup", async (req, res) => {
  
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

app.post("/login",async(req,res) => {
  try{  
    const {emailId,password} =req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user) {
      throw new Error ("EmailId is not present in DB")
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid) {
      res.send("Login sucessful!!")
    }else {
      throw new Error ("Password id not valid ")
    }


  } catch (err) {
    res.status(400).send("Error:" + err.message)
  }
})


//Get API 
app.get("/user", async (req,res) => {
  const userEmail = req.body.emailId; 
  try { 
    const user = await User.find({emailId :userEmail})
    if(!user) {
      res.status(400).send("something went wrong ")
      
    } else {
      res.send(user);

    }
    

  } catch(err) {
    res.send("Error are occured")

  }
});

//Feed API -Get /feed - get all user form database

app.get("/feed", async (req,res) => {
  try{
     const users =  await User.find({});
  res.send(users)

  }catch(err) {
    res.status(400).send("something went wrong ")

  }

})


//Delete a user from database
app.delete("/user", async(req,res) => {
  const userId = req.body.userId
  try{
    const user = await User.findByIdAndDelete({_id: userId})
    res.send("user deleted sucessfully ");

  }catch(err) {
    res.status(400).send("something went wrong ")

  } 
})

//update data of user
app.patch("/user/:userId",async(req,res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data)
  try {
    const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => 
    ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed) {
    throw new Error ("update not allowed ")
    
  }

  if(data?.skills.length > 10 ) {
    throw new Error("skill can not be more than 10")
  }
  

     const user = await User.findByIdAndUpdate ({_id: userId },data, {
      returnDocument : "after",
      runValidators: true,
     });
     console.log(user)
     res.send("user updated sucessfully ")

    

  } catch(err) {
    res.status(401).send("UPDATE FAILED " + err.message)

  }
})


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



