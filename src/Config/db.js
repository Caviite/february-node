const mongoose = require("mongoose")
const env = require("./env");

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(env.MONGODB_URL);

       if(conn){
        console.log("MongoDB connected successfully");
       }

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB 