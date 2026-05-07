// Run this once: node migrate-categories.js
// This updates old category values to new ones in DB

const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const categoryMap = {
  men: "books",
  women: "electronics",
  kids: "furniture",
  footwear: "sports",
};

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  for (const [oldVal, newVal] of Object.entries(categoryMap)) {
    const result = await Product.updateMany(
      { category: oldVal },
      { $set: { category: newVal } }
    );
    console.log(`${oldVal} → ${newVal}: ${result.modifiedCount} products updated`);
  }

  console.log("Migration complete!");
  await mongoose.disconnect();
}

migrate().catch(console.error);
