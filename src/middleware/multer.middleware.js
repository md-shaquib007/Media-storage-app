import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempDir = process.env.VERCEL ? "/tmp" : "./public/temp";
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });
