import { ethers } from 'ethers';
import dotenv from 'dotenv';
import * as starkbank from 'starkbank'

dotenv.config();

const senderPrivateKey = process.env.SENDER_PRIVATE_KEY || '';
const recipientAddress = '';
const providerUrl = process.env.INFURA_URL || '';
const usdcAddress = process.env.USDC_ADDRESS || '';
const privateKeyContent = process.env.STARK_PRIVATE_KEY || '';
const projectID = process.env.STARK_PROJECT_ID || '';

let project = new starkbank.Project({
    environment: 'sandbox',
    id: projectID,
    privateKey: privateKeyContent
});
starkbank.setUser(project);

// Connect to the network
const provider = new ethers.JsonRpcProvider(providerUrl);

// Create a walconst instance
const wallet = new ethers.Wallet(senderPrivateKey, provider);


export const sendCryptoController = async (req, res) => {
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
      return res.status(200).json({'response': `Transaction successful with hash: ${receipt.hash}`});
    } catch (error) {
        return res.send(`Error: ${error.message}`);
    }
};


export const sendPaymentController = async (req, res) => {
    try {
        let transfers = await starkbank.transfer.create([
            {
                amount: 100,
                bankCode: '20018183',  // Pix
                branchCode: '0001',
                accountNumber: '6296276215791616',
                accountType: "salary",
                taxId: '20.018.183/0001-80',
                name: 'Tonyg Stark',
                tags: ['iron', 'suoit']
            },
        ]);
        for (let transfer of transfers) {
            console.log(transfer);
        }
      res.send('Transfers created successfully!');
    } catch (error) {
      console.error(error);
      res.status(400).send('An error occurred while creating transfers.');
    }
  }