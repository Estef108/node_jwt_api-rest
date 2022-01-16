const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const SECRET_SESSION = process.env.SECRET_SESSION;


const connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        const {name, host} = db.connection;
        console.log(`Connected with db: ${name}, in host ${host}`)
    } catch (error) {
        console.log('Error to connect with DB', error);
    }
}

module.exports = {
    connect,
    PORT,
    MONGO_URL,
    SECRET_SESSION
}