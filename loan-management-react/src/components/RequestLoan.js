import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

const RequestLoan = () => {
  const [income, setIncome] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [proofHash, setProofHash] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Add Web3 and contract initialization here
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        setAccounts(accounts);
        const contractAddress = '0x4c7787517e6c491be2409B88F7A7de357C470d1c'; // Replace with your contract address
        const contractABI = [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "repaymentPeriod",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
              }
            ],
            "name": "LoanCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "LoanRepaid",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "income",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "creditScore",
                "type": "uint256"
              }
            ],
            "name": "generateLoanRequestZkpProof",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "generateZkpProof",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "getLoanDetails",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "loanCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "loans",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "repaymentPeriod",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "minCreditScore",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "minIncome",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "proofHash",
                "type": "bytes32"
              }
            ],
            "name": "repayLoanWithProof",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "repaymentPeriod",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "income",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "creditScore",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "proofHash",
                "type": "bytes32"
              }
            ],
            "name": "requestLoanWithProof",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }]; // Replace with your contract ABI
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      });
    }
  }, []);

  const generateProof = () => {
    const hash = Web3.utils.keccak256(income + creditScore);
    setProofHash(hash);
  };

  const handleRequestLoan = async () => {
    setStatus('Submitting loan request...');
    try {
      await contract.methods.requestLoanWithProof(income, creditScore, 12, proofHash).send({ from: accounts[0] });
      setStatus('Loan Request Successful');
      navigate('/dashboard');
    } catch (error) {
      setStatus('Loan Request Failed');
      console.error(error);
    }
  };

  return (
    <div style={pageStyle}>
      <h2>Request a Loan</h2>
      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Credit Score"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
        style={inputStyle}
      />
      <button onClick={generateProof} style={buttonStyle}>Generate Proof</button>
      {proofHash && <p>Proof Hash: {proofHash}</p>}
      <button onClick={handleRequestLoan} style={buttonStyle}>Request Loan</button>
      <p>{status}</p>
    </div>
  );
};

const pageStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f4',
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  background: '#007bff',
  padding: '10px 20px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default RequestLoan;
