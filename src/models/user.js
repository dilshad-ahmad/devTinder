const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true,
        minLength:2,
        maxLength:60
    },
    lastName: {
        type: String
    },
    emailId : {
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ("Invalid email address" + value)
            }
        }

    },
    password: {
        type:String,
        required:true,
              validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },

age: {
    type:Number,
    min:18
},
gender: {
    type:String,
   

},
photoUrl: {
    type: String,
    default:"https://www.freepik.com/free-photo/portrait-expressive-young-woman_13467664.htm#fromView=keyword&page=1&position=25&uuid=b2758666-2519-4a66-959e-b489990cd1e3&query=User+Profile"
},

about: {
    type: String,
    default: "This is default about the user!"
},
skills: {
    type:[String]
}


});




userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};



module.exports = mongoose.model("User",userSchema)