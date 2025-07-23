const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");



    requestRouter.post("/sendConnectionRequest",userAuth, async (req,res) => {
      const  user = req.user;
      console.log("sendin a connection Request ");

      res.send(user.firstName + "send the connection Request ")
    })



module.exports =requestRouter ;
