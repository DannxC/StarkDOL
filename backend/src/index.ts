import express from 'express';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;


const senderPrivateKey = process.env.SENDER_PRIVATE_KEY || '';
const recipientAddress = '';
const providerUrl = process.env.INFURA_URL || '';
const usdcAddress = process.env.USDC_ADDRESS || '';

// Connect to the network
let provider = new ethers.JsonRpcProvider(providerUrl);

// Create a wallet instance
let wallet = new ethers.Wallet(senderPrivateKey, provider);

app.get('/trigger-payment', async (req, res) => {
  try {
    // Connect to USDC contract on the network
    const contract = new ethers.Contract(usdcAddress, [
      "function transfer(address to, uint amount) public",
    ], wallet);

    // Amount to transfer (change this as necessary)
    const amount = ethers.parseUnits("1.0", 6); // 1 USDC

    // Transfer the USDC
    const tx = await contract.transfer(recipientAddress, amount);

    // Wait for the transaction to be mined
    const receipt = await provider.waitForTransaction(tx.hash);
    console.log(receipt);
    res.send(`Transaction successful with hash: ${receipt}`);
  } catch (error : any) {
    res.send(`Error: ${error.message}`);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});