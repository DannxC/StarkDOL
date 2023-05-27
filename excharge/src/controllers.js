import { ethers } from 'ethers';
import dotenv from 'dotenv';
import axios from 'axios';
import * as starkbank from 'starkbank'

dotenv.config();

const senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
const exchargeAddress = '';
const providerUrl = process.env.INFURA_URL;
const usdcAddress = process.env.USDC_ADDRESS;
const privateKeyContent = process.env.STARK_PRIVATE_KEY;
const exchangePrivateKeyContent = process.env.STARK_USER_PRIVATE_KEY;
const projectExchangeID = process.env.STARK_PROJECT_USER_ID;
const usdToBrlAPI = process.env.COIN_API;


const exchange = new starkbank.Project({
    environment: 'sandbox',
    id: projectExchangeID,
    privateKey: exchangePrivateKeyContent
});
starkbank.setUser(exchange);

// Connect to the network
const provider = new ethers.JsonRpcProvider(providerUrl);

// Create a walconst instance
const wallet = new ethers.Wallet(senderPrivateKey, provider);


export const sendPaymentController = async (req, res) => {
    const { 
        accountNumber,
        bankCode,
        branchCode,
        value,
        hash
    } = req.body;
    
    try {                
        // Fetch transaction data
        const tx = await provider.getTransaction(hash);

        // Convert wei to USDC (assuming 6 decimal places for USDC)
        const txValue = ethers.utils.formatUnits(tx.value, 6);

        if (txValue !== value) {
            return res.status(400).send('Transaction value does not match provided value.');
        }

        const usd = await axios.get(usdToBrlAPI);
        const usdValue = value * usd.data.USDBRL.ask;

        // console.log(value * usd.data.USDBRL.ask);
        let transfers = await starkbank.transfer.create([
            {
                amount: Math.round(usdValue),
                bankCode: bankCode,
                branchCode: branchCode,
                accountNumber: accountNumber,
                accountType: "salary",
                taxId: '20.018.183/0001-80',
                name: 'Tonyg Stark'
            },
        ]);
        
        return res.status(200).json({'response': `test`});
    } catch (error) {
      console.error(error);
      res.status(400).send('An error occurred while creating transfers.');
    }
  }