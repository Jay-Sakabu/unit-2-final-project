import { useState, useEffect } from "react";
import TransactionHistory from "./TransactionHistory";
import NetWorth from "./NetWorth.jsx";
import "../../BudgetDashboard.css";
import Budget from "./Budget.jsx";

// Placeholder Monthly Spending Component 
// TODO: Make this component functional and add it to components also make it a list because that's the one requirement not yet fulfilled
const MonthlySpending = () => (
    <div className="dashboard-box">
        <h2>Monthly Spending</h2>
        <p>Total: $1,425</p>
        <ul>
            <li>Food: $345</li>
            <li>Rent: $953</li>
            <li>Other: $127</li>
        </ul>
    </div>
);


const BudgetDashboard = () => {
    const [budget, setBudget] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user-budget");
        if (stored) {
            setBudget(JSON.parse(stored));
        }
    }, []);
    return (
        <div>

            <div className="budget-dashboard">
                <div className="row">
                    <Budget />
                </div>

            </div>
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

        </div>
    );
};

export default BudgetDashboard;