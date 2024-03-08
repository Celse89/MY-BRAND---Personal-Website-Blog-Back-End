import multer from 'multer';

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/profiles/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const blogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/blogs/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const profileUpload = multer({
    storage: profileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const blogUpload = multer({
    storage: blogStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

export { profileUpload, blogUpload };