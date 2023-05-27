import cors from "cors";
import express from 'express';
import * as controllers from './controllers.js'
import * as starkbank from 'starkbank'

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log('test');
    res.send('Hello, world!');
});

app.get(
    '/balance',
    controllers.getBalanceController
);

app.post(
    '/payment', 
    controllers.sendPaymentController
);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});