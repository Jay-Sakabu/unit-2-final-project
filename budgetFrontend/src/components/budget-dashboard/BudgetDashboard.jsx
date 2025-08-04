import { useState, useEffect, useMemo, useContext } from "react";
import TransactionHistory from "./TransactionHistory";
import NetWorth from "./NetWorth.jsx";
import "../../App.css";
import Budget from "./Budget.jsx";
import Graph from "./Graph.jsx";
import { AuthContext } from "../auth-context/AuthContext.jsx";
import api from "../api-axios/api.jsx";


const BudgetDashboard = () => {
    const { user } = useContext(AuthContext);
    const [budget, setBudget] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({
        Needs: 0,
        Wants: 0,
        Savings: 0,
    });
    const [error, setError] = useState("");

    // Helper to convert server attributes to client attributes, this should really be a component
    const toUIBudget = server => ({
        id: server.id,
        needs: server.needsValue,
        wants: server.wantsValue,
        savings: server.savingsValue,
        monthlyIncome: server.needsValue + server.wantsValue + server.savingsValue,
    });

    // Load budget from endpoint
    useEffect(() => {
        if (!user) return;
        api
            .get("/budget/budget", { params: { userId: user.id } })
            .then(res => {
                if (res.data) {
                    setBudget(toUIBudget(res.data));
                } else {
                    // no existing budget explicit set to null to avoid strange "undefined" crashes
                    setBudget(null);
                }
            })
            .catch(() => setError("Could not load budget"));
    }, [user]);

    // Load transactions
    useEffect(() => {
        if (!user) return;
        api
            .get("/transactions", { params: { userId: user.id } })
            .then(response => setTransactions(response.data))
            .catch(() => setError("Could not load transactions"));
    }, [user]);

    // Recalcualte the category totals
    useEffect(() => {
        const totals = transactions.reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
            return acc;
        }, {});
        setCategoryTotals({
            Needs: totals.Needs || 0,
            Wants: totals.Wants || 0,
            Savings: totals.Savings || 0
        });
    }, [transactions]);

    const budgetTargets = useMemo(() => ({
        Needs: budget?.needs || 0,
        Wants: budget?.wants || 0,
        Savings: budget?.savings || 0,
    }), [budget]);

    const actualSpendingWithUnallocated = useMemo(() => {
        const spent = (categoryTotals.Needs || 0)
            + (categoryTotals.Wants || 0)
            + (categoryTotals.Savings || 0);
        return {
            ...categoryTotals,
            Unallocated: Math.max(0, (budget?.monthlyIncome || 0) - spent),
        };
    }, [categoryTotals, budget]);

    if (!user) return null;

    return (
        <div>
            <div className="budget-dashboard">
                <Budget budget={budget} />
            </div>

            <div className="budget-dashboard">
                <TransactionHistory
                    transactions={transactions}
                    setTransactions={setTransactions}
                    onCategoryTotals={setCategoryTotals}
                />
                <NetWorth />
                <NetWorth />
            </div>

            {budget && (
                <div className="budget-dashboard">
                    <Graph
                        actualSpending={actualSpendingWithUnallocated}
                        budgetTargets={budgetTargets}
                    />
                </div>
            )}
        </div>
    );
};

export default BudgetDashboard;