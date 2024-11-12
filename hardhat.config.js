require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: API_URL, // Volta RPC URL
      accounts: [`0xe794be1b1ef83b6a76a70e4789ab0a8a95a5039eb1cac74d73ab88a1e85dbe66`], // Your private key
      gas: 21, // Gas for transactions
      gasPrice: 80, // Gas price in gwei
    }
  },
};
