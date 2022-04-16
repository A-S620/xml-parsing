import {getAllObjectsInFolder} from '../src/s3-functions';

require('dotenv').config();
describe('S3 Functions', () => {
  describe('getAllObjectsInFolder', () => {
    it('should return the keys of the objects in the folder', async () => {
      const result = await getAllObjectsInFolder("");
      expect(Number(result.length)).toBeGreaterThan(0);
    });
    it('should throw an error when the BUCKET_NAME is invalid', async () => {
      process.env.BUCKET_NAME = "";
      try {
        await getAllObjectsInFolder("");
      } catch (error) {
        expect(error).toEqual(new Error("UriParameterError: Expected uri parameter to have length >= 1, but found \"\" for params.Bucket"));
      }
    });
  });
});
