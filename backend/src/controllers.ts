import { Request, Response, NextFunction } from "express";
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const senderPrivateKey = process.env.SENDER_PRIVATE_KEY || '';
const recipientAddress = '';
const providerUrl = process.env.INFURA_URL || '';
const usdcAddress = process.env.USDC_ADDRESS || '';

// Connect to the network
const provider = new ethers.JsonRpcProvider(providerUrl);

// Create a walconst instance
const wallet = new ethers.Wallet(senderPrivateKey, provider);


export const sendStarkDolController = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
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
      return res.status(200).json({'response': `Transaction successful with hash: ${receipt}`});
    } catch (error : any) {
        return res.send(`Error: ${error.message}`);
    }
};