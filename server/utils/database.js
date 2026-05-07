let mongoose = require('mongoose')
let dotenv = require('dotenv')

//to use env variables
dotenv.config()

let connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('!....MONGODB CONNECTED....!');
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectDB}