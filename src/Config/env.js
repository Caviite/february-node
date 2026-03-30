const dotenv = require('dotenv')
dotenv.config();

const env = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    expire_in: process.env.EXPIRE_IN,
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET
}

module.exports = env;