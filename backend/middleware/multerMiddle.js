// import multer from "multer";
// export const upload = multer({ storage: storage });
import * as path from 'path';
import multer from "multer";
const __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'images'));
      console.log(__dirname,'images    from destination storage multer middleware');
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      cb(null,Date.now() +  path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
export default upload;



// import multer from 'multer';
// import * as path from 'path';
// const __dirname = path.resolve();
// console.log()
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'images'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// export default upload;