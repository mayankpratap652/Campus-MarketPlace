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
        query[key] = { $in: values.map((val) => val.trim().toLowerCase()) };
      }
    });

//     console.log("Filters:", filters);
// console.log("Query:", query);

    /* 📊 SORTING */
    let sortStage = {};

    if (sortBy === "price-lowtohigh") sortStage = { effectivePrice: 1 };
    if (sortBy === "price-hightolow") sortStage = { effectivePrice: -1 };
    if (sortBy === "title-atoz") sortStage = { title: 1 };
    if (sortBy === "title-ztoa") sortStage = { title: -1 };

    /* 📦 AGGREGATION */
    const products = await Product.aggregate([
      { $match: query },

      {
        $addFields: {
          effectivePrice: {
            $cond: [
              { $gt: ["$salePrice", 0] },
              "$salePrice",
              "$price"
            ]
          }
        }
      },

      { $sort: Object.keys(sortStage).length ? sortStage : { createdAt: -1 } },

      { $skip: (page - 1) * limit },
      { $limit: Number(limit) }
    ]);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total: totalProducts,
      page: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
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