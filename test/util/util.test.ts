import {convertXMLDocToJSON, findReturnedDebitItems} from "../../src/util/util";
import {returnedDebitItems, xmlAsJSON, xmlAsString} from "../test-data/test-data";

const {getFileByKey} = require("../../src/s3-functions");

describe("Util", () => {
    describe("convertXMLtoJSON", () => {
        it("should correctly convert an xml string into json object", async () => {
            expect(convertXMLDocToJSON(xmlAsString)).toEqual(xmlAsJSON)

        })
        it("should return na empty object when the xml is invalid", () => {
            expect(convertXMLDocToJSON("invalid xml")).toEqual({})
        })
    })
    describe("findReturnedDebitItems", () => {
        it("should correctly extract the ReturnedDebitItems Array from a json object", async () => {
            expect(findReturnedDebitItems(xmlAsJSON)).toEqual(returnedDebitItems)
        })
        it("should return an empty array when the object doesnt have ReturnedDebitItems", async () => {
            expect(findReturnedDebitItems({"aKey": 'aValue'})).toEqual([])
        })
    })
})
