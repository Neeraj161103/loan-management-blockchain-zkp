async function main() {
    // Get the contract factory
    const Loan = await ethers.getContractFactory("Loan");

    // Deploy the contract
    const loan = await Loan.deploy();

    // Wait until the contract is deployed
    await loan.deployed();

    console.log("Loan contract deployed to:", loan.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
