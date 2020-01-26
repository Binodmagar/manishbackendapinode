const express = require('express');
const multer = require('multer');
const path = require("path");
const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let exactPath = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${exactPath}`);
    }
});

const imgFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new Error("You can upload only image files!!"),false);

    }
    callback(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imgFileFilter
});



uploadRouter.route('/')
.post(upload.single('imageFile'), (req, res) => {
    res.json(req.file);

});
module.exports = uploadRouter;