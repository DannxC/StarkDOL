# Stark Doleidos - Efficiency in International Transactions


## Overview

Stark Doleidos is an innovative solution that utilizes the Polygon network to conduct international transactions in a more efficient and economical manner. We eliminate the need for an intermediary bank and subsequently reduce transfer fees typically associated with such operations. 
Also, you can see our [StarkDOL WhitePaper](https://docs.google.com/document/d/1syS44YSfUzaASGn_znxSkXdBAxlY7r8462p0Pny59L8/edit?usp=sharing)


## Technologies Used
* Typescript and VUE for the frontend
* Polygon blockchain for gas efficiency
* ERC20 protocols for the StarkDOL Stable Coin
* Node.js, express.js, ethers.js for the backend
* HardHat for the contracts
* StarkBank API


## Features
* Facilitate cost-effective international transactions with enhanced efficiency
* Eliminate the necessity for intermediary banks, reducing operational complexity
* Smooth integration with the Polygon network for secure and swift transfers
* Provision of a transparent audit trail ensuring the accuracy and reliability of the services

## Flowchart
This is how the application works.
1. You provide the transaction details such as the amount to be transferred and the recipient account information. Once complete, you click 'Send'

2. In the backend, a deposit is made from your StarkBank account to the StarkDOL reserve pool equivalent to the desired transfer amount

3. Following the deposit, the backend mints an equal amount of StarkDOLs to uphold the stability of this token, a stablecoin pegged to the US dollar. Here is the StarkDOL icon:

![starkdol verde logo](https://github.com/DannxC/StarkDOL-backend/assets/101767386/d148458f-7c99-45c4-868a-68d02be5860b)


4. To bypass intermediaries, the newly minted StarkDOLs are used to facilitate the transfer to an account in a designated exchange, which could be in another country

5. Upon receipt, the exchange automatically converts the StarkDOLs into US dollars, which are then transferred to the recipient account in the other country

6. Below is a flowchart for visualizing this process. It's important to note that the end-user doesn't need to understand the underlying process; they only experience the cost-saving benefits of using our service!

![StarkDOL 1 chart](https://github.com/DannxC/StarkDOL-backend/assets/101767386/932a8d76-27f1-4a4d-9681-b1741fbb54be)


## Getting Started
## Requirements
### Backend 
1. `cd backend`
2. `npm install`
3. Rename the `.env.template` file to `.env` and complete with all necessary information, including the StarkBank project info and the blockchain addresses and private keys.
4. `npm start`
### Excharge Backend 
1. `cd excharge`
2. `npm install`
3. Rename the `.env.template` file to `.env` and complete with all necessary information, including the StarkBank project info and the blockchain addresses and private keys.
4. `npm start`
### SmartContracts
1. `cd contracts`
2. `npm install`
3. Rename the `.env.template` file to `.env` and set your the DEPLOY_INFURA_KEY and PRIVATE_KEY variables
4. `npx hardhat run --network mumbai ./scripts/deploy.ts`


## Usage
### User Interface
1. As a StarkBank client, you enjoy access to various services on their platform. To conduct international transactions, simply click on the "International Transactions" option. Here, a user-friendly interface will prompt you for essential details like your Bank Agency, Bank Account, and the dollar amount you wish to send. With a single click, the transaction begins, and a confirmation pop-up appears upon completion

2. To enhance transparency, you may utilize our API to scrutinize and audit the reserve pool and the volume of tokens in circulation. It's important to maintain a balance where each StarkDOL in circulation corresponds to a dollar in the reserve pool. To visualize this functionality, visit our front-end for a live demonstration


## Team:
[DannxC](https://github.com/DannxC)
[Ferroca2](https://github.com/Ferroca2)
[Rafael450](https://github.com/Rafael450)
