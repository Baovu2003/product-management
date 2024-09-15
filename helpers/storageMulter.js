const multer = require("multer");

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/');  // Set the destination directory
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();  // Generate a unique file name using timestamp
            cb(null, `${uniqueSuffix}-${file.originalname}`);  // Save file with a unique name
        }
    });

    return storage;  // Return the storage object so it can be used in multer
};
