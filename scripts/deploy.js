const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Compile contract and deploy
    const LoanManagement = await hre.ethers.getContractFactory("LoanManagement");
    const loanManagement = await LoanManagement.deploy();

    console.log("LoanManagement contract deployed to:", loanManagement.address);

    // Save contract address to .env for frontend interaction
    const fs = require("fs");
    fs.appendFileSync(".env", `CONTRACT_ADDRESS=${loanManagement.address}\n`);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
