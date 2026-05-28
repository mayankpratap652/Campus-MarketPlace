const Product = require("../../models/Product");

/* =========================================
   GET FILTERED + SORTED + PAGINATED PRODUCTS
========================================= */

const getFilteredProducts = async (req, res) => {
  try {
    const {
      sortBy,
      page = 1,
      limit = 8,
      search,
      ...filters
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    let query = {};

    /* 🔎 SEARCH */
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    /* 🎯 FILTERS */
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        const values = Array.isArray(filters[key])
          ? filters[key]
          : filters[key].split(",").map((v) => v.trim());
        query[key] = {
          $in: values.map((val) => new RegExp(`^${val.trim()}$`, "i"))
        };
      }
    });

    console.log("Query:", JSON.stringify(query));

    /* 📊 SORTING */

    /* 📦 FETCH WITH SORT + PAGINATION */
    let sortObj = {};
    if (sortBy === "price-lowtohigh") sortObj = { salePrice: 1, price: 1 };
    else if (sortBy === "price-hightolow") sortObj = { salePrice: -1, price: -1 };
    else if (sortBy === "title-atoz") sortObj = { title: 1 };
    else if (sortBy === "title-ztoa") sortObj = { title: -1 };
    else sortObj = { createdAt: -1 };

    const products = await Product.find(query)
      .sort(sortObj)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total: totalProducts,
      page: pageNum,
      totalPages: Math.ceil(totalProducts / limitNum),
      data: products
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetching Products"
    });
  }
};


/* =========================================
   GET SINGLE PRODUCT DETAILS
========================================= */

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetching Product Details"
    });
  }
};


/* =========================================
   EXPORT
========================================= */

module.exports = {
  getFilteredProducts,
  getProductDetails
};