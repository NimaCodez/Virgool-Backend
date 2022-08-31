const md5 = require("md5");
const multer = require("multer");

const CreateFilePath = (req) => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const pathname = req.pathname.split("/")[0];
    const directory = path.join(__dirname, "..", "..", "public", "uploads", pathname, year, month, day)
    req.body.fileUploadPath = path.join("uploads", pathname, year, month, day)
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

    }
})