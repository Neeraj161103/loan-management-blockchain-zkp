// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanManagement {

    // Struct to represent a loan
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 repaymentPeriod;
        address borrower;
        bool isActive;
    }

    // Mapping to store loans by ID
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    // Minimum income and credit score required for a loan
    uint256 public minIncome = 50000; // Hardcoded minimum income required for a loan
    uint256 public minCreditScore = 650; // Hardcoded minimum credit score required

    // Event to notify when a loan is created
    event LoanCreated(uint256 loanId, uint256 amount, uint256 interestRate, uint256 repaymentPeriod, address borrower);

    // Event to notify when a loan is repaid
    event LoanRepaid(uint256 loanId);

    // Function to request a loan with user-provided proof
    function requestLoanWithProof(uint256 amount, uint256 interestRate, uint256 repaymentPeriod, uint256 income, uint256 creditScore, bytes32 proofHash) external {
        // Check if the user's income and credit score meet the minimum requirements
        require(income >= minIncome, "Income does not meet the minimum requirement.");
        require(creditScore >= minCreditScore, "Credit score does not meet the minimum requirement.");

        // Generate the expected proof based on the user's income and credit score
        bytes32 expectedProof = generateLoanRequestZkpProof(income, creditScore);
        
        // Validate the proof against the provided proofHash
        require(proofHash == expectedProof, "Invalid proof for loan request.");

        // If the proof is valid, create the loan
        loanCount++;
        loans[loanCount] = Loan(amount, interestRate, repaymentPeriod, msg.sender, true);

        emit LoanCreated(loanCount, amount, interestRate, repaymentPeriod, msg.sender);
    }

    // Function to repay a loan with a ZKP proof
    function repayLoanWithProof(uint256 loanId, bytes32 proofHash) external payable {
        require(loans[loanId].isActive, "Loan is not active.");
        require(msg.sender == loans[loanId].borrower, "Only the borrower can repay the loan.");
        
        // Calculate the total repayment amount (principal + interest)
        uint256 totalRepayment = loans[loanId].amount + (loans[loanId].amount * loans[loanId].interestRate / 100);
        
        // Ensure the sent amount is correct
        require(msg.value >= totalRepayment, "Insufficient funds to repay the loan.");

        // Validate the provided ZKP proof
        // In this case, we use a simple hash check as a placeholder for actual ZKP logic
        bytes32 expectedHash = keccak256(abi.encodePacked(msg.sender, totalRepayment));
        require(proofHash == expectedHash, "Invalid proof of repayment.");

        // Mark the loan as repaid
        loans[loanId].isActive = false;
        emit LoanRepaid(loanId);
    }

    // Function to check the loan details
    function getLoanDetails(uint256 loanId) external view returns (uint256, uint256, uint256, address, bool) {
        Loan memory loan = loans[loanId];
        return (loan.amount, loan.interestRate, loan.repaymentPeriod, loan.borrower, loan.isActive);
    }

    // Function to generate the ZKP proof for loan request
    // (In this case, the proof is generated based on income and credit score)
    function generateLoanRequestZkpProof(uint256 income, uint256 creditScore) public pure returns (bytes32) {
        // The proof is the hash of income and credit score
        return keccak256(abi.encodePacked(income, creditScore));
    }

    // Function to generate the ZKP proof for repayment (as done previously)
    function generateZkpProof(uint256 loanId) external view returns (bytes32) {
        Loan memory loan = loans[loanId];
        uint256 totalRepayment = loan.amount + (loan.amount * loan.interestRate / 100);
        // Here, we simply return the hash as the ZKP proof (for demonstration)
        return keccak256(abi.encodePacked(msg.sender, totalRepayment));
    }
}
