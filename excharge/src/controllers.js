import { ethers } from 'ethers';
import dotenv from 'dotenv';
import axios from 'axios';
import * as starkbank from 'starkbank'

dotenv.config();

const senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
const providerUrl = process.env.INFURA_URL;
const exchangePrivateKeyContent = process.env.STARK_PRIVATE_KEY;
const projectExchangeID = process.env.STARK_PROJECT_ID;
const contractAddress = process.env.CONTRACT_ADDRESS;
const usdToBrlAPI = process.env.COIN_API;
const exchangeAddress = process.env.EXCHANGE_ADDRESS;
const taxId = process.env.TAX_ID;




const exchange = new starkbank.Project({
    environment: 'sandbox',
    id: projectExchangeID,
    privateKey: exchangePrivateKeyContent
});
starkbank.setUser(exchange);

// Connect to the network
const provider = new ethers.JsonRpcProvider(providerUrl);
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

        // Initialize an instance of the contract at the USDC address
        const contract = new ethers.Contract(contractAddress, [
            "function mint(address to, uint256 amount) public",
        ], wallet);

        // Decode the transaction data
        const data = contract.interface.parseTransaction({ data: tx.data });

        // Get the amount from the mint function
        const mintedAmount = ethers.formatUnits(data.args[1].toString(), 16);

        console.log(mintedAmount);

        if(parseInt(mintedAmount) !== value) {
            return res.status(400).send('Minted USDC value does not match provided value.');
        }
        
        
        const usdPrice = await axios.get(usdToBrlAPI);
        const realValue = value * usdPrice.data.USDBRL.ask;

        let transfers = await starkbank.transfer.create([
            {
                amount: Math.round(realValue),
                bankCode: bankCode,
                branchCode: branchCode,
                accountNumber: accountNumber,
                accountType: "salary",
                taxId: '04.308.899/0001-65',
                name: 'FinalCLient'
            },
        ]);
        
        return res.status(200).json({'response': transfers?.[0]});
    } catch (error) {
      console.error(error);
      res.status(400).send('An error occurred while creating transfers.');
    }
  }

  export const getBalanceController = async (req, res) => {
    const starkDolContract = new ethers.Contract(contractAddress, [
        //this is the ABI for the balanceOf function
        "function balanceOf(address owner) view returns (uint256)"
    ], provider);

    try {
        const starkbankBalance = await starkbank.balance.get({
            user: starkbank.user
        });
        
        const starkDolBalance = await starkDolContract.balanceOf(exchangeAddress);

        const usdPrice = await axios.get(usdToBrlAPI);

        // Format the balance from wei to USDC (assuming USDC has 6 decimal places)
        const starkDolFormatted = ethers.formatUnits(starkDolBalance, 18);

        starkbankBalance.amount = Math.round(starkbankBalance.amount/usdPrice.data.USDBRL.ask);

        return res.status(200).json({
            'starkbankBalance': starkbankBalance,
            'starkDolBalance': starkDolFormatted
        });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}