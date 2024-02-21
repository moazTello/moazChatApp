import * as path from 'path';
import multer from "multer";
const __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'images'));
      console.log(__dirname,'images    from destination storage multer middleware');
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +  path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
export default upload;