import AWS, { S3 } from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
});
export const getAllKeysOfFileObjects = (arrayOfObjects: Array<object>) => {
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
export const getAllObjectsInFolder = async (prefix: string) => {
  const s3 = new AWS.S3();

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
  } catch (e) {
    throw new Error(e as string);
  }
  return [];
};
