const mongoose = require('mongoose');


const connectDB = async () => {
    
mongoose.connect(
    "mongodb+srv://laddu4591:kblDamsXQMXxHcCX@namaste.u8etnpm.mongodb.net/devTinder"
);

};

module.exports = connectDB ;

