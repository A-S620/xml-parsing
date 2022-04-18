import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { getAllObjectsInFolder } from './aws-functions/s3-functions';
import { Config } from './config';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.get('/new-files', (req: Request, res: Response) => {
  const newFiles = getAllObjectsInFolder('prod/new-files/');
  res.send(Config.bucketName);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app;
