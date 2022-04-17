import { XMLParser } from 'fast-xml-parser';

function convertXMLDocToJSON(xml: string) {
  const options = {
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '',
    ignorePiTags: true,
  };
  const parser = new XMLParser(options);
  const jsObject = parser.parse(xml) as object;
  console.log(jsObject);
  if (jsObject) {
    return jsObject;
  }
}
export { convertXMLDocToJSON };
