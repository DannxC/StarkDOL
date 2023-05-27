import express from 'express';
import * as controllers from './controllers.js'

const app = express();
const port = process.env.PORT;

app.get(
    '/trigger-blockchain-payment',
    controllers.sendCryptoController
);

app.get('/', (req, res) => {
    console.log('test');
    res.send('Hello, world!');
});

app.get(
    '/trigger-starkbank-payment', 
    controllers.sendPaymentController
);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});