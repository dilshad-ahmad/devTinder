const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //crating a new instance of user model
  const user = new User(req.body);

  try {

    await user.save();
    res.send("User send sucessfully !")


  } catch (err) {
    res.status(400).send("Error saving the user" + err.message)

  }


});

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



