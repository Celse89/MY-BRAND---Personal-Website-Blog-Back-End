import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname, '../uploads/profiles/');
        createDirectory(dirPath);
        cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const blogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join(__dirname, '../uploads/blogs/');
        createDirectory(dirPath);
        cb(null, dirPath);
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