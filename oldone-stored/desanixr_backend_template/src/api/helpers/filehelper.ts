import multer, { FileFilterCallback } from 'multer';

//Storage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, file._id);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1000000000 },
}).single('fileData');

export default upload;
