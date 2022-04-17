import {getAllKeysOfFileObjects, getAllObjectsInFolder, getFileByKey} from "../src/util/s3-functions";

require('dotenv').config();

const oldEnvVars = process.env;

beforeEach(() => {
  jest.resetModules()
  process.env = { ...oldEnvVars };
});

afterAll(() => {
  process.env = oldEnvVars;
});
describe('S3 Functions', () => {
  describe('getAllObjectsInFolder', () => {
    it('should return all the objects sin the folder', async () => {
      const result = await  getAllObjectsInFolder("test/");
      expect(Number(result.length)).toBeGreaterThan(0);
    });
    it('should throw an error when the BUCKET_NAME is invalid', async () => {
      process.env.BUCKET_NAME = "";
      try {
        await  getAllObjectsInFolder("");
      } catch (error) {
        expect(error).toEqual(new Error("UriParameterError: Expected uri parameter to have length >= 1, but found \"\" for params.Bucket"));
      }
    });
  });
  describe("getAllKeysOfFileObjects", () => {
    it("should return the keys of all the objects in the folder", async () => {
      const result = await  getAllObjectsInFolder("test/");
      expect( getAllKeysOfFileObjects(result)).toEqual(["test/sample-xml.txt"]);
    });
    });
  describe("getObjectByKey", () => {
    it("should return the object when the key is valid", async () => {
      const result = await  getFileByKey("test/sample-xml.txt");
      expect(result.substring(0, 43)).toEqual("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>");
    });
    it('should throw an error when the file key is invalid', async () => {
      try {
        await  getFileByKey("not-a-valid-key");
      } catch (error) {
        expect(error).toEqual(new Error("NoSuchKey: The specified key does not exist."));
      }
    });
    });
  })
