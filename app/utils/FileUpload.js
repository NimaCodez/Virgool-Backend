const md5 = require("md5");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const CreateFilePath = (req) => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const rootpath = req.pathname.split("/")[1];
    const subpath = req.pathname.split("/")[2];
    let subpathString = "posts";
    console.log(subpath, rootpath)
    let directory;
    if (subpath == "new-post") directory = path.join(__dirname, "..", "..", "public", "uploads", rootpath, req.user.username, subpathString, year, month, day)
    else directory =  path.join(__dirname, "..", "..", "public", "uploads", rootpath, req.user.username, year, month, day)
    req.body.fileUploadPath = path.join("uploads", rootpath, year, month, day)
    fs.mkdirSync(directory, { recursive: true })
    return directory;
}

const CreateImageNameHash = (ImageName) => {
    return md5(ImageName)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const FilePath = CreateFilePath(req);
            return cb(null, FilePath)
        }
        cb (null, null)
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const ext = path.extname(file.originalname)
            const filename = String(CreateImageNameHash(file.originalname) + ext)
            req.body.filename = filename;
            return cb(null, filename)
        }
        cb(null, null)
    }
})

function FileFilter(req, file, cb) {
    const MimeTypes =  [".png", ".jpg", ".jpeg", ".webp", ".gif"]
    const Ext = path.extname(file.originalname)
    if (MimeTypes.includes(Ext)) {
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest("File Format is not correct! "))
}

const maxSize = 10 * 1000 * 1000; // 10MB
const FileUpload = multer({
    storage,
    fileFilter: FileFilter,
    limits: {
        fileSize: maxSize
    }
})

module.exports = {
    FileUpload,
}
