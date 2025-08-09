const express = require("express");
const profileRouter = express.Router() ;

const { userAuth } = require("../middlewares/auth");
const{validateEditProfileData} = require("../utils/validation")

//Profile view API 

profileRouter.get("/profile/view",userAuth,async (req,res) => {
  try{

    const user = req.user;
   

    res.send(user)


  } catch (err) {
    res.status(400).send("Error:" + err.message)
  }
})


// Profile edit API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // Validate request body
        validateEditProfileData(req);

        const loggedInUser = req.user;

        // Update allowed fields only
        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        });

        // Save updated user
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
});


module.exports = profileRouter;
