// import multer library for handling file uploads in node.js
import multer from 'multer';

// define storage configuration for multer
const storage = multer.diskStorage({
    // destination folder where files are stored
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    // naming convention for the uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// validate the uploaded file types
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // if file type is invalid then set a custom error message
        req.fileValidationError = 'Invalid file type. Only JPEG, JPG and PNG are allowed!';
        cb(null, false);
    }
}

export const upoload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: { fileSize: 1024 * 1024 * 2 },  // set file size limit of 2MB
}).single('image'); // handling single file uploads with field name 'image'