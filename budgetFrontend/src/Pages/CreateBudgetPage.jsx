import { useContext, useEffect, useState } from 'react';
import BudgetForm from '../components/forms/BudgetForm'
import Budget from '../components/budget-dashboard/Budget';
import api from '../components/api-axios/api';
import { AuthContext } from '../components/auth-context/AuthContext';

const CreateBudgetPage = () => {
    const { user } = useContext(AuthContext);
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Helper to turn the server Budget → UI Budget
    const toUIBudget = server => ({
        id: server.id,
        needs: server.needsValue,
        wants: server.wantsValue,
        savings: server.savingsValue,
        monthlyIncome: server.needsValue + server.wantsValue + server.savingsValue,
    });

    // READ
    useEffect(() => {
        if (!user) return;
        setLoading(true);
        api
            .get("/budget/budget", { params: { userId: user.id } })
            .then(res => {
                if (res.data) {
                    setBudget(toUIBudget(res.data));
                } else {
                    // no budget yet set to explicit null to fit error handling in budget
                    setBudget(null);
                }
            })
            .catch(err => {
                console.log("Asset not found, not necessarily an error")
            })
            .finally(() => {
                setLoading(false)
            });
    }, [user]);

    // CREATE / UPDATE
    const handleBudgetSubmit = newBudget => {
        if (!user) return;
        setLoading(true);
        setError("");

        // Build the payload to match JPA entity
        const payload = {
            id: budget?.id, //Needed for JPA id to match properly
            needsValue: newBudget.needs,
            wantsValue: newBudget.wants,
            savingsValue: newBudget.savings,
            user: { id: user.id },
        };

        api
            .post("/budget/budget", payload)
            .then(res => {
                setBudget(toUIBudget(res.data));
            })
            .catch(() => {
                setError("Failed to save budget");
            })
            .finally(() =>
                setTimeout(() => {
                    setLoading(false);
                }, 1500));
    };
    if (!user) return null;

    return (
        <div className="create-budget-page">
            <BudgetForm onSubmitBudget={handleBudgetSubmit} />

            {loading && (
                <div className="dashboard-box">
                    <p>Loading…</p>
                </div>
            )}

            {!loading && budget && (
                <Budget budget={budget} />
            )}
        </div>
    );
}

export default CreateBudgetPage;