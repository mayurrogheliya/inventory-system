import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid file type. Only JPEG, JPG and PNG are allowed!';
        cb(null, false);
    }
}

export const upoload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: { fileSize: 1024 * 1024 * 2 },
}).single('image');