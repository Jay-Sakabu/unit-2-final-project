import { useState, useEffect, useMemo } from "react";
import TransactionHistory from "./TransactionHistory";
import NetWorth from "./NetWorth.jsx";
import "../../App.css";
import Budget from "./Budget.jsx";
import Graph from "./Graph.jsx";


const BudgetDashboard = () => {
    const [budget, setBudget] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({
        Needs: 0,
        Wants: 0,
        Savings: 0,
    });

    // Added to cache budgetTargets, can't think of a reason why the graph would re-render this, but want to avoid that mistake again
    // https://react.dev/learn/you-might-not-need-an-effect
    const budgetTargets = useMemo(() => {
        if (!budget) {
            return { Needs: 0, Wants: 0, Savings: 0 };
        }
        return {
            Needs: budget.needs,
            Wants: budget.wants,
            Savings: budget.savings,
        };
    }, [budget]);

    useEffect(() => {
        const stored = localStorage.getItem("user-budget");
        if (stored) {
            setBudget(JSON.parse(stored));
        }
    }, []);

    //TODO: Replace w/ endpoint
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        setAllTransactions(storedTransactions ? JSON.parse(storedTransactions) : []);
    }, []);

    const actualSpendingWithUnallocated = useMemo(() => {
        if (!budget) {
            return { ...categoryTotals, Unallocated: 0 };
        }
        const spent =
            (categoryTotals.Needs || 0) +
            (categoryTotals.Wants || 0) +
            (categoryTotals.Savings || 0);
        return {
            ...categoryTotals,
            Unallocated: Math.max(0, budget.monthlyIncome - spent),
        };
    }, [categoryTotals, budget])

    return (
        <div>

            <div className="budget-dashboard">
                <div className="row">
                    <Budget propBudget={budget} />
                </div>

            </div>
            <div className="budget-dashboard">
                <div className="row">
                    <TransactionHistory
                        transactions={allTransactions}
                        setTransactions={setAllTransactions}
                        onCategoryTotals={setCategoryTotals}
                    />
                </div>

                <div className="row">
                    <NetWorth />
                </div>
                <div className="row">
                    <NetWorth />
                </div>
            </div>
            {/* Conditional rendering, if no budget, don't show the empty graphs */}
            {budget && (
                <div className="budget-dashboard">
                    <div className="row">
                        <div className="row">
                            <Graph actualSpending={actualSpendingWithUnallocated}
                                budgetTargets={budgetTargets}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetDashboard;