import { ethers } from 'ethers';
import dotenv from 'dotenv';
import axios from 'axios';
import * as starkbank from 'starkbank'

dotenv.config();

const senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
const exchangeAddress = '0x8D2b47E6eD926fef8104BaC992ec6567ABE08716';
const providerUrl = process.env.INFURA_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;
const userPrivateKeyContent = process.env.STARK_USER_PRIVATE_KEY;
const projectUserID = process.env.STARK_PROJECT_USER_ID;
const usdToBrlAPI = process.env.COIN_API;
const bankCode = process.env.BANK_CODE;
const branchCode = process.env.BRANCH_CODE;
const accountNumber = process.env.ACCOUNT_NUMBER;
const exchangeAPI = process.env.EXCHANGE_API;

const user = new starkbank.Project({
    environment: 'sandbox',
    id: projectUserID,
    privateKey: userPrivateKeyContent
});
starkbank.setUser(user);

// Connect to the network
const provider = new ethers.JsonRpcProvider(providerUrl);

// Create a walconst instance
const wallet = new ethers.Wallet(senderPrivateKey, provider);

export const sendPaymentController = async (req, res) => {
    const { 
        value,
        finalBankCode,
        finalBranchCode,
        finalAccountNumber
    } = req.body;
    
    try {
        const usdPrice = await axios.get(usdToBrlAPI);
        if (!usdPrice || !usdPrice.data || !usdPrice.data.USDBRL) {
            throw new Error('Failed to fetch USD price');
        }
        const realValue = value * usdPrice.data.USDBRL.ask;

        let transfers = await starkbank.transfer.create([
            {
                amount: Math.round(realValue),
                bankCode: bankCode,
                branchCode: branchCode,
                accountNumber: accountNumber,
                accountType: "salary",
                taxId: '20.018.183/0001-80',
                name: 'StarkBank'
            },
        ]);

        // Check if transfers were successful
        if (!transfers) {
            throw new Error('Failed to create transfer');
        }

        // Connect to USDC contract on the network
        const contract = new ethers.Contract(contractAddress, [
            "function mint(address to, uint256 amount) public",
        ], wallet);
    
        // Amount to transfer (change this as necessary)
        const amount = ethers.parseUnits(Math.round(value).toString(), 16); 
    
        // Transfer the StarkDOL
        const mint = await contract.mint(exchangeAddress, amount);

        // Wait for the transaction to be mined
        const receipt = await provider.waitForTransaction(mint.hash);

        const exchangeReq = await axios.post(exchangeAPI+"/payment", {
            accountNumber: finalAccountNumber,
            bankCode: finalBankCode,
            branchCode: finalBranchCode,
            value: Math.round(value),
            hash: receipt.hash
        });

        // Check if exchange request was successful
        if (!exchangeReq || !exchangeReq.data) {
            throw new Error('Failed to make exchange request');
        }

        return res.status(200).json({'response': exchangeReq.data});
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}


export const getBalanceController = async (req, res) => {
    try {
        const balance = await starkbank.balance.get({
            user: starkbank.user
        });

        return res.status(200).json({'response': balance});
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}