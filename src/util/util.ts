import { XMLParser } from 'fast-xml-parser';

import flatten from 'flat';

function convertXMLDocToJSON(xml: string) {
  const options = {
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '',
    ignorePiTags: true,
  };
  const parser = new XMLParser(options);
  const jsObject = parser.parse(xml) as object;
  if (Object.keys(jsObject).length > 0) {
    return jsObject;
  }
  return {};
}
function findReturnedDebitItems(obj: object): Array<object> {
  const flattenedObject = flatten(obj, {
    safe: true,
  }) as object;
  const foundValue = Object.entries(flattenedObject).filter(([key]) => key.includes('ReturnedDebitItem'));
  if (foundValue.length === 1) {
    return foundValue[0][1] as Array<object>;
  }
  return [];
}

export { convertXMLDocToJSON, findReturnedDebitItems };
