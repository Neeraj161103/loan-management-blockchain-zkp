require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.27", // Set this to match the Solidity version in your contract
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ganache: {
      url: "https://d6d1-122-164-81-35.ngrok-free.app", // Ganache default RPC server
    },
  },
};
