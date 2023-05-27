import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config({ path: __dirname+'/.env' });
const myPrivateKey: string = process.env.PRIVATE_KEY as string;
const myInfuraId: string = process.env.DEPLOY_INFURA_KEY as string;


const config: HardhatUserConfig = {
  solidity:  {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "local",
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
    },
    aurora: {
      url: `https://aurora-testnet.infura.io/v3/${myInfuraId}`,
      accounts: [myPrivateKey],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${myInfuraId}`,
      accounts: [myPrivateKey],
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    }
  },
  paths: {
    artifacts: "./build"
  }
};

export default config;