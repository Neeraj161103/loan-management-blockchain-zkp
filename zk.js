// zk.js
const { Bulletproofs } = require('bulletproofs');  // Import Bulletproofs library

// Function to create proof for loan repayment amount
async function proveLoanRepayment(amount) {
    const proof = await Bulletproofs.createProof(amount);  // Create proof for loan amount
    return proof;
}

// Function to verify proof of repayment
async function verifyRepayment(proof) {
    const verified = await Bulletproofs.verifyProof(proof);  // Verify the proof
    return verified;
}

module.exports = { proveLoanRepayment, verifyRepayment };
