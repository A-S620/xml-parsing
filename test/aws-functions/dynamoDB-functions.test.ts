import {returnedDebitItems} from "../test-data/test-data";
import {deleteItemInDB, getItemInDB, putItemInDB} from "../../src/aws-functions/dynamoDB-functions";

require('dotenv').config();
const oldEnvVars = process.env;

beforeEach(() => {
    jest.resetModules()
    process.env = { ...oldEnvVars };
});
afterAll(() =>{
    process.env = oldEnvVars;
})
describe("DynamoDB Functions", () => {
    describe("putItemInDB", () => {
        it("should successfully put an item in the database", async () => {
            await putItemInDB(returnedDebitItems[0]);
            const response = await getItemInDB(
                [
                    'ref',
                ],
                {
                    "ref": {
                        "S": "X01234"
                    }
                });
            expect(response).toEqual({"Item": {"ref": {"S": "X01234"}}}
            )
        })
        it("should throw an error when the TABLE_NAME is not set", async () => {
            process.env.TABLE_NAME = undefined;
            try {
                await putItemInDB(returnedDebitItems[0]);
            } catch (error) {
                expect(error).toEqual(
                    new Error("MissingRequiredParameter: Missing required key 'TableName' in params"))
            }
        })
    })
    describe("getItemInDB", () => {
        it("should throw an error when the TABLE_NAME is not set", async () => {
            process.env.TABLE_NAME = undefined;
            try {
                await getItemInDB(
                    [
                        'ref',
                    ],
                    {
                        "ref": {
                            "S": "X01234"
                        }
                    });
            } catch (error) {
                expect(error).toEqual(
                    new Error("MissingRequiredParameter: Missing required key 'TableName' in params"))
            }
        })
    })
    describe("deleteItemInDB", () => {
        it("should successfully delete an item in the database", async () => {
            await deleteItemInDB({
                "ref": {
                    "S": "X01234"
                }
            })
            const response = await getItemInDB(
                [
                    'ref',
                ],
                {
                    "ref": {
                        "S": "X01234"
                    }
                });
            expect(response).toEqual({})
        })
        it("should throw an error when the TABLE_NAME is not set", async () => {
            process.env.TABLE_NAME = undefined;
            try {
                await deleteItemInDB(
                    {
                        "ref": {
                            "S": "X01234"
                        }
                    });
            } catch (error) {
                expect(error).toEqual(
                    new Error("MissingRequiredParameter: Missing required key 'TableName' in params"))
            }
        })
    })
})