const cloudinary = require("cloudinary").v2;
const multer = require("multer");
let dotenv = require("dotenv");

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();


//for upload the file in cloudnary 
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

//for storage 
const upload = multer({ storage });
//easily access to another page
module.exports = { upload, imageUploadUtil };
