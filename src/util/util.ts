import * as xml2js from 'xml2js';

export function convertXMLtoJSON(xml: string): object {
  xml2js.parseString(xml, (err: any, result: any) => {
    if (err) {
      throw err;
    }
    // console.log(result);
  });
  return {};
}
