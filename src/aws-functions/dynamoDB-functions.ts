import { AttributeValue } from '@aws-sdk/client-dynamodb';
import AWS, { DynamoDB } from 'aws-sdk';
import { Config } from '../config';

AWS.config.update({
  accessKeyId: Config.accessKeyId,
  secretAccessKey: Config.secretAccessKey,
  region: 'eu-west-2',
});
const dynamoDB = new AWS.DynamoDB();
const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient();
const putItemInDB = async (file: object) => {
  const params: object = {
    Item: file,
    TableName: Config.tableName,
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
    TableName: Config.tableName,
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
    TableName: Config.tableName,
    Key: key,
  };
  try {
    return await dynamoDB.deleteItem(<DynamoDB.DeleteItemInput>params).promise();
  } catch (error) {
    throw new Error(error as string);
  }
};

export { putItemInDB, getItemInDB, deleteItemInDB };
