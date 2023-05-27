import express from 'express';
import * as controllers from './controllers'

const app = express();
const port = process.env.PORT;

app.get(
    '/trigger-payment',
    controllers.sendStarkDolController
);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});