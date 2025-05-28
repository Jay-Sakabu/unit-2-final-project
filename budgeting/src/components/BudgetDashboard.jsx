import React, { useState } from "react";
import netWorthData from "../assets/netWorth.json";
import transactionsData from "../assets/transactions.json";
import "../BudgetDashboard.css";

// Transaction data

const income = transactionsData
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
const expenses = transactionsData
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);


// Monthly Spending
const MonthlySpending = () => {
    return (
        <div className="dashboard-box">
            <h2>Monthly Spending </h2>
            <p>Total:</p>
            <ul>
                <li> A dollar </li>
            </ul>
        </div>
    );
};



//Transaction History Summary
const TransactionHistory = () => {
    return (
        <div className="dashboard-box">
            <h2>Transaction History</h2>
            <p>Total Income: ${income.toFixed(2)}</p>
            <p>Total Expenses: -${Math.abs(expenses).toFixed(2)}</p>
            <ul>
                {transactionsData.map((transaction, index) => (
                    <li key={index} className="list-item">
                        <span className="transaction-date">
                            {transaction.date.length == 0 ? "Transaction" : transaction.date}:
                        </span>
                        <span className="transaction-description">
                            {transaction.description}
                        </span>
                        <span className="transaction-amount">
                            {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                        <span><button style={{color: "red"}}>Delete</button></span>
                        <span><button style={{color: "blue"}}>Edit</button></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Main Dashboard Component
const BudgetDashboard = () => {
    return (
        <div className="budget-dashboard">
            <div className="row">
                <div className="dashboard-box"><h2>Net Worth</h2></div>
                <MonthlySpending />

            </div>
            <div className="row">
                <TransactionHistory />
            </div>
            <div className="row">
                <TransactionHistory />
            </div>
        </div>
    );
};

export default BudgetDashboard;