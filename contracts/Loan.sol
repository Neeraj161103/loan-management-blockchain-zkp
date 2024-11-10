// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Loan {

    mapping(uint256 => LoanData) public loans;
    uint256 public loanCount;

    // Struct renamed to LoanData
    struct LoanData {
        uint256 amount;
        address borrower;
        uint256 loanId;
        bool isRepaid;
        bool isTransferred;
    }

    // Request a loan
    function requestLoan(uint256 amount) public returns (uint256) {
        loanCount++;
        loans[loanCount] = LoanData(amount, msg.sender, loanCount, false, false);
        return loanCount;
    }

    // Repay the loan
    function repayLoan(uint256 loanId) public {
        require(loans[loanId].borrower == msg.sender, "Not the borrower");
        loans[loanId].isRepaid = true;
    }

    // Get the status of the loan
    function getLoanStatus(uint256 loanId) public view returns (string memory) {
        LoanData memory loan = loans[loanId];
        if (loan.isRepaid) {
            return "Repaid";
        } else if (loan.isTransferred) {
            return "Transferred";
        } else {
            return "Pending";
        }
    }
}
