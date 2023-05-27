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


export const sendCryptoController = async (req, res) => {
    try {
      // Connect to USDC contract on the network
      const contract = new ethers.Contract(usdcAddress, [
        "function transfer(address to, uint amount) public",
      ], wallet);
  
      // Amount to transfer (change this as necessary)
      const amount = ethers.parseUnits("1.0", 6); // 1 USDC
  
      // Transfer the USDC
      const tx = await contract.transfer(exchangeAddress, amount);
  
      // Wait for the transaction to be mined
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);
      return res.status(200).json({'response': `Transaction successful with hash: ${receipt.hash}`});
    } catch (error) {
        return res.send(`Error: ${error.message}`);
    }
};


export const sendPaymentController = async (req, res) => {
    const { 
        value,
        finalBankCode,
        finalBranchCode,
        finalAccountNumber
    } = req.body;
    
    try {
        const usdPrice = await axios.get(usdToBrlAPI);
        const realValue = value * usdPrice.data.USDBRL.ask;

        // console.log(value * usd.data.USDBRL.ask);
        let transfers = await starkbank.transfer.create([
            {
                amount: Math.round(realValue),
                bankCode: bankCode,
                branchCode: branchCode,
                accountNumber: accountNumber,
                accountType: "salary",
                taxId: '20.018.183/0001-80',
                name: 'Tonyg Stark'
            },
        ]);

        // Connect to USDC contract on the network
        const contract = new ethers.Contract(contractAddress, [
            "function mint(address to, uint256 amount) public",
        ], wallet);
    
        // Amount to transfer (change this as necessary)
        const amount = ethers.parseUnits(Math.round(value/100).toString(), 18); 
    
        // Transfer the StarkDOL
        const mint = await contract.mint(exchangeAddress, amount);

        // Wait for the transaction to be mined
        const receipt = await provider.waitForTransaction(mint.hash);

        const exchangeReq = await axios.post(exchangeAPI+"payment", {
            accountNumber: finalAccountNumber,
            bankCode: finalBankCode,
            branchCode: finalBranchCode,
            value: Math.round(value),
            hash: receipt.hash
        }).then(response => {
            console.log(response.data);
        })
            .catch(error => {
            console.error(error);
        });;


    
        
        
        return res.status(200).json({'response': `Transaction successful with hash: ${receipt.hash}`});
    } catch (error) {
      console.error(error);
      res.status(400).send('An error occurred while creating transfers.');
    }
  }