const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        trim:true
    },
    password: {
        type:String,
        required:true
    },

age: {
    type:Number,
    min:18
},
gender: {
    type:String,
    validate(value) {
        if (!["male","female","other"].includes(value)){
            throw new Error("Gender data is not valid");
        }


    }

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


module.exports = mongoose.model("User",userSchema)