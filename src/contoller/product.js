const Product = require("../model/product");

const addProduct = async (req, res) => {
    const { title, price, description } = req.body;
    log
    try {
        if (!title || !price || !description || !req.file) {
            return res.status(401).json({ message: "all fields are required" });
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: "february Products" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Cloudinary upload failed" });
                }
                console.log(result, "from cloudinary");

                const product = {
                    ...req.body,
                    image: result.secure_url,
                    imageId: result.public_id,
                };

                await Product.create(product);

                if (product) {
                    return res
                        .status(201)
                        .json({ message: "product created Succefully", product });
                }
            }
        );

        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, error.message);
    }

    const getProduct = async (req, res) => {
        try {
            const product = await Product.find();
            if (product) {
                return res
                    .status(200)
                    .json({ message: "product retrieved Succefully", product });

            }
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error, error.message);
        }
    };

    const updateProduct = async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            if (product) {
                return res.status(200).json({ message: "Product updated successfully", product });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error, error.message);
        }
    };

    const getSingleProduct = async (req, res) => {
        const id = req.params.id;

        try {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({
                message: "Product retrieved successfully",
                product
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error, error.message);
        }
    };

    module.exports = { addProduct, getProduct, updateProduct, getSingleProduct };




}
// mongodb+srv://caviti:7O1RfmQVvwycxlih@cluster0.kkgsknc.mongodb.net/?appName=Cluster0


// 7O1RfmQVvwycxlih
// // caviti