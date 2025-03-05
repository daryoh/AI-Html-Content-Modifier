import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { processContentController } from './controllers/';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

setupSwagger(app);

app.post('/api/process-content', processContentController);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});