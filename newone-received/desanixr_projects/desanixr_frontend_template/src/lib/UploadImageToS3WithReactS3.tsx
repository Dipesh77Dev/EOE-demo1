import React, { ChangeEvent, useState } from 'react';
import { uploadFile } from 'react-s3';

const S3_BUCKET = 'dxrapiupload';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIAW22T2JKY27NFDD4U';
const SECRET_ACCESS_KEY = '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';

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const UploadImageToS3WithReactS3 = () => {
  const [file, setFile] = useState<File>();

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log('e.target.files', event.target.files);
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log('Data not found');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bf = require('buffer');
    window.Buffer = window.Buffer || bf.Buffer;
    console.log('current file', file);

    await uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload()}> Upload to S3</button>
    </div>
  );
};

export default UploadImageToS3WithReactS3;
