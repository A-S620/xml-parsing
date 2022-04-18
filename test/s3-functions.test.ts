import {
  copyFilesToAnotherFolder,
  createJSONDocAndUpload,
  getAllKeysOfFileObjects,
  getAllObjectsInFolder,
  getFileByKey
} from "../src/s3-functions";
import {returnedDebitItems} from "./test-data/test-data";

require('dotenv').config();

const oldEnvVars = process.env;

beforeEach(() => {
  jest.resetModules()
  process.env = { ...oldEnvVars };
});

afterAll(async () => {
  process.env = oldEnvVars;
});
describe('S3 Functions', () => {
  describe('getAllObjectsInFolder', () => {
    it('should return all the objects in the folder', async () => {
      const result = await  getAllObjectsInFolder("test/new-files/");
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
      const result = await  getAllObjectsInFolder("test/new-files/");
      expect( getAllKeysOfFileObjects(result)).toEqual(["test/new-files/sample-xml.txt"]);
    });
    });
  describe("getObjectByKey", () => {
    it("should return the object when the key is valid", async () => {
      const result = await  getFileByKey("test/new-files/sample-xml.txt");
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
  describe("createJSONDocAndUpload", () => {
    it("should create a JSON file from the object parameter and upload it to the correct folder in S3", async () => {
      await createJSONDocAndUpload(returnedDebitItems,  "test/json/sample-json.json");
      const result = await  getFileByKey("test/json/sample-json.json");
      expect(JSON.parse(result)).toEqual(returnedDebitItems);
    });
    it('should throw an error when the BUCKET_NAME is invalid', async () => {
      process.env.BUCKET_NAME = "";
      try {
        await createJSONDocAndUpload(returnedDebitItems,  "test/json/sample-json.json");
      } catch (error) {
        expect(error).toEqual(new Error("UriParameterError: Expected uri parameter to have length >= 1, but found \"\" for params.Bucket"));
      }
    });
  });
  describe("copyFilesToAnotherFolder", () => {
    it("should correctly copy a file from new-files/ to archive/", async () => {
      await copyFilesToAnotherFolder("test/new-files/", "test/archive/", "test/new-files/sample-xml.txt");
      expect((await  getFileByKey("test/archive/sample-xml.txt")).substring(0, 43)).toEqual("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>");
    });
    it('should throw an error when the BUCKET_NAME is invalid', async () => {
      process.env.BUCKET_NAME = "";
      try {
        await copyFilesToAnotherFolder("test/new-files/", "test/archive/", "test/new-files/sample-xml.txt");
      } catch (error) {
        expect(error).toEqual(new Error("UriParameterError: Expected uri parameter to have length >= 1, but found \"\" for params.Bucket"));
      }
    });
  })
})
