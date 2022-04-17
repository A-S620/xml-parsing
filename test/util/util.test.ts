import {convertXMLDocToJSON, findReturnedDebitItems} from "../../src/util/util";

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
const xmlAsJSON = {
    "BACSDocument":{
        "Data":{
            "ARUDD":{
                "AddresseeInformation":{
                    "name":"SOME COMPANY LTD"
                },
                "Advice":{
                    "OriginatingAccountRecords":{
                        "OriginatingAccountRecord":{
                            "OriginatingAccount":{
                                "bankName":"SOME BANK",
                                "branchName":"CITY",
                                "name":"SOME COMPANY LTD",
                                "number":"12345678",
                                "sortCode":"01-02-03",
                                "type":"0"
                            },
                            "ReturnedDebitItem":[
                                {
                                    "PayerAccount":{
                                        "bankName":"A BANK",
                                        "branchName":"A BRANCH",
                                        "name":"FRED SMITH",
                                        "number":"12345678",
                                        "ref":"X01234",
                                        "sortCode":"01-02-03"
                                    },
                                    "currency":"GBP",
                                    "originalProcessingDate":"2017-01-12",
                                    "ref":"X01234",
                                    "returnCode":"1012",
                                    "returnDescription":"INSTRUCTION CANCELLED",
                                    "transCode":"17",
                                    "valueOf":"65.00"
                                },
                                {
                                    "PayerAccount":{
                                        "bankName":"A DIFFERENT BANK",
                                        "branchName":"DIFF BRANCH",
                                        "name":"JESSICA RABBIT",
                                        "number":"23456789",
                                        "ref":"X02345",
                                        "sortCode":"02-03-04"
                                    },
                                    "currency":"GBP",
                                    "originalProcessingDate":"2017-01-12",
                                    "ref":"X02345",
                                    "returnCode":"1012",
                                    "returnDescription":"INSTRUCTION CANCELLED",
                                    "transCode":"17",
                                    "valueOf":"60.00"
                                },
                                {
                                    "PayerAccount":{
                                        "bankName":"SPECIAL BUILDING SOCIETY",
                                        "branchName":"LOCAL BRANCH",
                                        "name":"STEVE ROGERS",
                                        "number":"34567891",
                                        "ref":"X03456",
                                        "sortCode":"03-04-05"
                                    },
                                    "currency":"GBP",
                                    "originalProcessingDate":"2017-01-12",
                                    "ref":"X03456",
                                    "returnCode":"1012",
                                    "returnDescription":"INSTRUCTION CANCELLED",
                                    "transCode":"17",
                                    "valueOf":"100.00"
                                }
                            ],
                            "Totals":{
                                "currency":"GBP",
                                "numberOf":"3",
                                "valueOf":"225.00"
                            }
                        }
                    }
                },
                "Header":{
                    "adviceNumber":"000",
                    "currentProcessingDate":"2017-01-16",
                    "reportType":"REFT1234"
                },
                "ServiceLicenseInformation":{
                    "userName":"SOME COMPANY LTD",
                    "userNumber":"123456"
                }
            }
        },
        "Signature":"",
        "SignatureMethod":"Vanilla",
        "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
        "xsi:noNamespaceSchemaLocation":"newbacs-advices.xsd"
    }
}
const returnedDebitItems = [
    {
        "PayerAccount":{
            "bankName":"A BANK",
            "branchName":"A BRANCH",
            "name":"FRED SMITH",
            "number":"12345678",
            "ref":"X01234",
            "sortCode":"01-02-03"
        },
        "currency":"GBP",
        "originalProcessingDate":"2017-01-12",
        "ref":"X01234",
        "returnCode":"1012",
        "returnDescription":"INSTRUCTION CANCELLED",
        "transCode":"17",
        "valueOf":"65.00"
    },
    {
        "PayerAccount":{
            "bankName":"A DIFFERENT BANK",
            "branchName":"DIFF BRANCH",
            "name":"JESSICA RABBIT",
            "number":"23456789",
            "ref":"X02345",
            "sortCode":"02-03-04"
        },
        "currency":"GBP",
        "originalProcessingDate":"2017-01-12",
        "ref":"X02345",
        "returnCode":"1012",
        "returnDescription":"INSTRUCTION CANCELLED",
        "transCode":"17",
        "valueOf":"60.00"
    },
    {
        "PayerAccount":{
            "bankName":"SPECIAL BUILDING SOCIETY",
            "branchName":"LOCAL BRANCH",
            "name":"STEVE ROGERS",
            "number":"34567891",
            "ref":"X03456",
            "sortCode":"03-04-05"
        },
        "currency":"GBP",
        "originalProcessingDate":"2017-01-12",
        "ref":"X03456",
        "returnCode":"1012",
        "returnDescription":"INSTRUCTION CANCELLED",
        "transCode":"17",
        "valueOf":"100.00"
    }
]
const xmlAsString = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n" +
    "    <!-- Generated by Oracle Reports version 10.1.2.3.0 -->\n" +
    "    <BACSDocument xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"newbacs-advices.xsd\">\n" +
    "        <Data>\n" +
    "            <ARUDD>\n" +
    "                <Header reportType=\"REFT1234\" adviceNumber=\"000\" currentProcessingDate=\"2017-01-16\">\n" +
    "                </Header>\n" +
    "                <AddresseeInformation name=\"SOME COMPANY LTD\">\n" +
    "                </AddresseeInformation>\n" +
    "                <ServiceLicenseInformation userName=\"SOME COMPANY LTD\" userNumber=\"123456\">\n" +
    "                </ServiceLicenseInformation>\n" +
    "                <Advice>\n" +
    "                    <OriginatingAccountRecords>\n" +
    "                        <OriginatingAccountRecord>\n" +
    "                            <OriginatingAccount name=\"SOME COMPANY LTD\" number=\"12345678\" sortCode=\"01-02-03\" type=\"0\" bankName=\"SOME BANK\" branchName=\"CITY\">\n" +
    "                            </OriginatingAccount>\n" +
    "                            <ReturnedDebitItem ref=\"X01234\" transCode=\"17\" returnCode=\"1012\" returnDescription=\"INSTRUCTION CANCELLED\" originalProcessingDate=\"2017-01-12\" valueOf=\"65.00\" currency=\"GBP\">\n" +
    "                                <PayerAccount number=\"12345678\" ref=\"X01234\" name=\"FRED SMITH\" sortCode=\"01-02-03\" bankName=\"A BANK\" branchName=\"A BRANCH\">\n" +
    "                                </PayerAccount>\n" +
    "                            </ReturnedDebitItem>\n" +
    "                            <ReturnedDebitItem ref=\"X02345\" transCode=\"17\" returnCode=\"1012\" returnDescription=\"INSTRUCTION CANCELLED\" originalProcessingDate=\"2017-01-12\" valueOf=\"60.00\" currency=\"GBP\">\n" +
    "                                <PayerAccount number=\"23456789\" ref=\"X02345\" name=\"JESSICA RABBIT\" sortCode=\"02-03-04\" bankName=\"A DIFFERENT BANK\" branchName=\"DIFF BRANCH\">\n" +
    "                                </PayerAccount>\n" +
    "                            </ReturnedDebitItem>\n" +
    "                            <ReturnedDebitItem ref=\"X03456\" transCode=\"17\" returnCode=\"1012\" returnDescription=\"INSTRUCTION CANCELLED\" originalProcessingDate=\"2017-01-12\" valueOf=\"100.00\" currency=\"GBP\">\n" +
    "                                <PayerAccount number=\"34567891\" ref=\"X03456\" name=\"STEVE ROGERS\" sortCode=\"03-04-05\" bankName=\"SPECIAL BUILDING SOCIETY\" branchName=\"LOCAL BRANCH\">\n" +
    "                                </PayerAccount>\n" +
    "                            </ReturnedDebitItem>\n" +
    "                            <Totals numberOf=\"3\" valueOf=\"225.00\" currency=\"GBP\">\n" +
    "                            </Totals>\n" +
    "                        </OriginatingAccountRecord>\n" +
    "                    </OriginatingAccountRecords>\n" +
    "                </Advice>\n" +
    "            </ARUDD>\n" +
    "        </Data>\n" +
    "        <SignatureMethod>\n" +
    "            Vanilla\n" +
    "        </SignatureMethod>\n" +
    "        <Signature>\n" +
    "        </Signature>\n" +
    "    </BACSDocument>\n"