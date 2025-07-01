import multer from 'multer';
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

// const DIR = 'uploads';
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//Storage
const Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_UPLOAD_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname.toLowerCase().split(' ').join('-'));
  },
});

// multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req: any, file: any, callback: any) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//     callback(null, Date.now() + '-' + fileName);
//   },
// });

const upload = multer({ storage: Storage });

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};

export { upload, fileSizeFormatter };
