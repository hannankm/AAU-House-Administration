const multer = require("multer");
const path = require("path");

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the file name (original name with timestamp to avoid collisions)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname); // Get the file extension
    const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, fileName);
  },
});

// Create Multer instance with the storage configuration
const upload = multer({ storage: storage });
module.exports = { upload };
