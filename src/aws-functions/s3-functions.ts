import AWS, { S3 } from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
});
const s3 = new AWS.S3();
const getAllKeysOfFileObjects = (arrayOfObjects: Array<object>) => {
  const keys: string[] = [];
  arrayOfObjects.forEach((obj: object) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'Key') {
        const fileName = value as string;
        const fileExtension = fileName.split('.').pop();
        if (fileExtension === 'txt' || fileExtension === 'xml') {
          keys.push(fileName);
        }
      }
    });
  });
  return keys;
};
const getAllObjectsInFolder = async (prefix: string) => {
  const params: object = {
    Bucket: process.env.BUCKET_NAME,
    Delimiter: '/',
    Prefix: prefix,
  };
  try {
    const s3Objects = await s3
      .listObjects(<S3.ListObjectsRequest>params)
      .promise();
    if (s3Objects.Contents) {
      return s3Objects.Contents;
    }
  } catch (error) {
    throw new Error(error as string);
  }
  return [];
};

const getFileByKey = async (key: string) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  try {
    const file = await s3.getObject(<S3.GetObjectRequest>params).promise();
    if (file.Body) {
      return file.Body.toString('utf-8');
    }
  } catch (error) {
    throw new Error(error as string);
  }
  return '';
};
const createJSONDocAndUpload = async (obj: object, fileKey: string) => {
  const buf = Buffer.from(JSON.stringify(obj));
  const data = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'application/json',
  };
  try {
    await s3.upload(<S3.PutObjectRequest>data).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};
const copyFilesToAnotherFolder = async (folderToMoveFrom: string, destinationFolder
: string, fileKey: string) => {
  try {
    const copySource = `${process.env.BUCKET_NAME}/${fileKey}`;
    const changedKey = `${destinationFolder}${fileKey.replace(folderToMoveFrom, '')}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      CopySource: copySource,
      Key: changedKey,
    };
    await s3.copyObject(<S3.CopyObjectRequest>params).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};
export {
  getAllKeysOfFileObjects,
  getAllObjectsInFolder,
  getFileByKey,
  createJSONDocAndUpload,
  copyFilesToAnotherFolder,
};
