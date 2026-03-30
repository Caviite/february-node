const cloudinary = require("cloudinary")
const env = require("./env")

cloudinary.config({
    cloud_name: env.cloud_name,
    api_key: env.api_key,
    api_secret: env.api_secret
});

module.exports = {cloudinary}