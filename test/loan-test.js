const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Loan Contract", function () {
  // Fixture for deploying the Loan contract
  async function deployLoanContractFixture() {
    const [owner, borrower] = await ethers.getSigners();

    const Loan = await ethers.getContractFactory("Loan"); // Update to Loan contract
    const loanContract = await Loan.deploy(); // Deploy Loan contract

    return { loanContract, owner, borrower };
  }

  describe("Loan Request", function () {
    it("Should allow loan requests", async function () {
      const { loanContract, borrower } = await loadFixture(deployLoanContractFixture);

      // Request a loan of 1000
      const loanId = await loanContract.requestLoan(1000);
      
      // Fetch loan status after requesting the loan
      const loanStatus = await loanContract.getLoanStatus(loanId);

      // The status should be 'Pending' after requesting
      expect(loanStatus).to.equal("Pending");
    });
  });

  describe("Loan Repayment", function () {
    it("Should allow loan repayment", async function () {
      const { loanContract, borrower } = await loadFixture(deployLoanContractFixture);

      // Request a loan of 1000
      const loanId = await loanContract.requestLoan(1000);

      // Repay the loan
      await loanContract.repayLoan(loanId);

      // Fetch loan status after repayment
      const loanStatus = await loanContract.getLoanStatus(loanId);

      // The status should be 'Repaid' after repayment
      expect(loanStatus).to.equal("Repaid");
    });
  });
});
