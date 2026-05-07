const Product = require("../../models/Product");
const { imageUploadUtil } = require("../../utils/cloudinary")


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured",
        });
    }
};

// add new product
let addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        } = req.body;

        let newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview
        });
        console.log(req.body.title);

        await newProduct.save()

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct,
        });

    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in creating Product data by Admin",
        });
    }
};
//     // get all products

let fetchAllProducts = async (req, res) => {
    try {
        let listOfData = await Product.find({})
        return res.status(200).json({ success: true, data: listOfData, message: "Products fetched successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error occured in fetching Product" })
    }
}

//  delete data

let deleteProduct = async (req, res) => {
    try {
        //  http: //loaclhost:8000/admin/product/:id
        let { id } = req.params
        let product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        return res.status(201).json({ success: true, message: "Product deleted successfully" })

    } catch (error) {
        return res.status(201).json({ success: false, message: "Eroor in deleting Product By Admin " })
    }
}

// edit product data

let editProduct = async (req, res) => {
    try {
        let { id } = req.params
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        } = req.body;

        let findProduct = await Product.findById(id)

        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
            salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        return res.status(200).json({
            success: true,
            data: findProduct,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Editing product By Admin",
        });
    }
}

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
};
