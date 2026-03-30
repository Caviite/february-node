const Product = require("../model/product");
const Cart = require("../model/cart");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        // Validate input
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }
        // Fetch product details        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Calculate price at the time of adding to cart
        const priceAtTime = product.price;
        // Create cart item
        const cartItem = {
            product: productId,
            quantity,
            priceAtTime
        };
        // Add to cart logic (this is a placeholder, you would need to implement the actual cart logic)
        // For example, you might want to find the user's cart and add this item to it
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            // If no cart exists, create a new one
            const newCart = new Cart({
                user: req.user.id,
                items: [cartItem],
                totalPrice: priceAtTime * quantity
            });   
            await newCart.save();
        } else {
            // If cart exists, add item to it
            cart.items.push(cartItem);
            cart.totalPrice += priceAtTime * quantity;
            await cart.save();
        }
        return res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};