import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import RequestLoan from './components/RequestLoan';
import RepayLoan from './components/RepayLoan';
import LoanDetails from './components/LoanDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-loan" element={<RequestLoan />} />
        <Route path="/repay-loan" element={<RepayLoan />} />
        <Route path="/loan-details" element={<LoanDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
