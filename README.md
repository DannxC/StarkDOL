# Stark Doleidos - Efficiency in International Transactions


## Overview

Stark Doleidos is an innovative solution that utilizes the Polygon network to conduct international transactions in a more efficient and economical manner. We eliminate the need for an intermediary bank and subsequently reduce transfer fees typically associated with such operations. 
Also, you can see our [StarkDOL WhitePaper](https://docs.google.com/document/d/1syS44YSfUzaASGn_znxSkXdBAxlY7r8462p0Pny59L8/edit?usp=sharing)


## Technologies Used
* Typescript and Next.js for the front-end
* MetaMask to connect the user with the front-end
* LayerX for connect the front-end functionalities to the contracts
* Aurora blockchain for minting NFTs
* ERC20 and ERC721 protocols for the GenIA token and NFTs
* Polygon for bridging between Aurora and Chainlink
* Chainlink for connecting to our own API (back-end)
* Node.js for the back-end
* DALL-E2 API for generating AI images
* Cloudinary for storing the images with a default URL

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
### Front-end 
1. `cd frontend`
2. `npm install`
3. Set the envoriment variables `NEXT_PUBLIC_CHAIN_ID`, `WEB3_HOST_PROVIDER`
4. npm run dev
### Back-end 
1. `cd backend`
2. `npm install`
3. Set the envoriment variables that connect to the cloudinary database and openAi API, `OPENAI_API_KEY`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
4. `node index`
### Contracts
1. `cd contracts`
2. `npm install`
3. Set your the DEPLOY_INFURA_KEY and PRIVATE_KEY variables
4. `npx hardhat run --network aurora ./scripts/deployAurora.ts`
5. `npx hardhat run --network mumbai ./scripts/deployMumbai.ts`

## Requirements
xxx?

## Usage
### User Interface
1. As a StarkBank client, you enjoy access to various services on their platform. To conduct international transactions, simply click on the "International Transactions" option. Here, a user-friendly interface will prompt you for essential details like your Bank Agency, Bank Account, and the dollar amount you wish to send. With a single click, the transaction begins, and a confirmation pop-up appears upon completion

2. To enhance transparency, you may utilize our API to scrutinize and audit the reserve pool and the volume of tokens in circulation. It's important to maintain a balance where each StarkDOL in circulation corresponds to a dollar in the reserve pool. To visualize this functionality, visit our front-end for a live demonstration


## Team:
[DannxC](https://github.com/DannxC)
[Ferroca2](https://github.com/Ferroca2)
[Rafael450](https://github.com/Rafael450)
