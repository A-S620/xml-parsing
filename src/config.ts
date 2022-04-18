import dotenv from 'dotenv';

dotenv.config();
export class Config {
  static accessKeyId = process.env.ACCESS_KEY_ID;

  static secretAccessKey = process.env.SECRET_ACCESS_KEY;

  static bucketName = process.env.BUCKET_NAME;

  static tableName = process.env.TABLE_NAME;
}
