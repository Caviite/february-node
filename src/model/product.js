const mongoose = require("mongoose");

// product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Atleast description must be 10 characters"],
        maxLength: [300, "THe maximum charater is 300"],
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    imageid: {
        type: String,
        requried: true
    }
});

// product model
module.exports = mongoose.model("Product", productSchema);