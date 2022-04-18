import { AttributeValue } from '@aws-sdk/client-dynamodb';
import AWS, { DynamoDB } from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
});
const dynamoDB = new AWS.DynamoDB();
const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient();
const putItemInDB = async (file: object) => {
  const params: object = {
    Item: file,
    TableName: process.env.TABLE_NAME,
  };
  try {
    await dynamoDBDocClient.put(<DynamoDB.PutItemInput>params).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};
const getItemInDB = async (
  attributesToGet: Array<string>,
  key: { [key: string]: AttributeValue },
) => {
  const params: object = {
    AttributesToGet: attributesToGet,
    TableName: process.env.TABLE_NAME,
    Key: key,
  };
  try {
    return await dynamoDB.getItem(<DynamoDB.GetItemInput>params).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};
const deleteItemInDB = async (key: { [key: string]: AttributeValue }) => {
  const params: object = {
    TableName: process.env.TABLE_NAME,
    Key: key,
  };
  try {
    return await dynamoDB.deleteItem(<DynamoDB.DeleteItemInput>params).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};

export { putItemInDB, getItemInDB, deleteItemInDB };
