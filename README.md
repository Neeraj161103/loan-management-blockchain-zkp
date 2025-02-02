# loan-management-blockchain-zkp

This is a demo application to implement a zkp based loan management system using react js and solidity.


## Installation
```shell
npm install
```
```shell
npx hardhat compile
npx hardhat run --network volta scripts/deploy.js
```
Once the contract is uploaded to the blockchain, copy the contract address and copy it in the .env file. You can also use another blockchain by writing the blockchain's endpoint in hardhat-config.
Once you have pasted your private key and contract address in the .env file, run the following commands.

```shell
cd loan-management-react
```

```shell
npm install web3
```

```shell
npm start
```
.env file shall look like this
API_URL = "https://volta-rpc.energyweb.org"
PRIVATE_KEY = "{Your prive key here}"
CONTRACT_ADDRESS = " {Your contract address here}"
