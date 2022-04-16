import AWS, { S3 } from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
});
export const getAllObjectKeysInFolder = async (prefix: string) => {

};
export const getAllObjectsInFolder = async (prefix: string) => {
  const s3 = new AWS.S3();

  const params: object = {
    Bucket: process.env.BUCKET_NAME,
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
    throw e as Error;
  }

  return [];
};
