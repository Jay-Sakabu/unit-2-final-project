import { useEffect, useState } from "react";

const Budget = ({ propBudget }) => {
    const [budget, setBudget] = useState(propBudget || null);

    useEffect(() => {
        if (propBudget) {
            // if a new budget comes in from the form, use it
            setBudget(propBudget);
        } else {
            const stored = localStorage.getItem("user-budget");
            if (stored) setBudget(JSON.parse(stored));
        }
    }, [propBudget]);

    if (!budget) {
        return (
            <div className="dashboard-box">
                <h2>No Budget Available</h2>
                <p>Please fill out the form from the tab "Create Budget"</p>
            </div>
        );
    }

    return (
        // TODO: Placeholder class-name, needs to be edited to look better
        <div className="dashboard-box">
            <h2>Budget Breakdown</h2>
            <p>With an average monthly income of: ${budget.monthlyIncome.toFixed(2)}</p>
            <div className="budget-breakdown-wrapper">
                <div className="budget-breakdown-row large-text">
                    <div>Needs</div>
                    <div>Wants</div>
                    <div>Savings</div>
                </div>
                <div className="budget-breakdown-row large-text">
                    <div>50%</div>
                    <div>30%</div>
                    <div>20%</div>
                </div>
                <div className="budget-breakdown-row large-text">
                    <div>${budget.needs.toFixed(2)}</div>
                    <div>${budget.wants.toFixed(2)}</div>
                    <div>${budget.savings.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default Budget;