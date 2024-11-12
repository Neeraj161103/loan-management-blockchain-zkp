const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoanManagement Contract", function () {
    let LoanManagement;
    let loanManagement;
    let owner;
    let borrower;

    beforeEach(async function () {
        [owner, borrower] = await ethers.getSigners();
        LoanManagement = await ethers.getContractFactory("LoanManagement");
        loanManagement = await LoanManagement.deploy();
    });

    it("Should allow a user to request a loan", async function () {
        const amount = ethers.utils.parseEther("10");

        await expect(loanManagement.connect(borrower).requestLoan(amount))
            .to.emit(loanManagement, "LoanRequested")
            .withArgs(borrower.address, amount);

        const loanDetails = await loanManagement.getLoan(borrower.address);
        expect(loanDetails.amount).to.equal(amount);
        expect(loanDetails.isRepaid).to.equal(false);
    });

    it("Should allow a user to repay a loan", async function () {
        const amount = ethers.utils.parseEther("10");
        await loanManagement.connect(borrower).requestLoan(amount);

        await expect(loanManagement.connect(borrower).repayLoan({ value: amount }))
            .to.emit(loanManagement, "LoanRepaid")
            .withArgs(borrower.address, amount);

        const loanDetails = await loanManagement.getLoan(borrower.address);
        expect(loanDetails.isRepaid).to.equal(true);
    });

    it("Should fail to request a loan if a loan is already active", async function () {
        const amount = ethers.utils.parseEther("10");
        await loanManagement.connect(borrower).requestLoan(amount);

        await expect(loanManagement.connect(borrower).requestLoan(amount))
            .to.be.revertedWith("Existing loan must be repaid first");
    });

    it("Should fail if the repayment amount is incorrect", async function () {
        const amount = ethers.utils.parseEther("10");
        await loanManagement.connect(borrower).requestLoan(amount);

        await expect(loanManagement.connect(borrower).repayLoan({ value: ethers.utils.parseEther("5") }))
            .to.be.revertedWith("Incorrect repayment amount");
    });
});
