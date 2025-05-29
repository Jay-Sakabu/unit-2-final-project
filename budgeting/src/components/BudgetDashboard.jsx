import React, { useState, useEffect } from "react";
import TransactionHistory from "./TransactionHistory";
import NetWorth from "./NetWorth.jsx";
import "../BudgetDashboard.css";

// Placeholder Monthly Spending Component
const MonthlySpending = () => (
    <div className="dashboard-box">
        <h2>Monthly Spending</h2>
        <p>Total:</p>
        <ul>
            <li>A dollar</li>
        </ul>
    </div>
);


const BudgetDashboard = () => {
    return (
        <div className="budget-dashboard">
            <div className="row">
                <MonthlySpending />
            </div>
            <div className="row">
                <TransactionHistory />
            </div>
            <div className="row">
                <NetWorth />
            </div>
        </div>
    );
};

export default BudgetDashboard;