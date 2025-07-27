import { useState } from 'react';
import BudgetForm from '../components/forms/BudgetForm'
import Budget from '../components/budget-dashboard/Budget';

const CreateBudgetPage = () => {
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBudgetSubmit = newBudget => {
        setLoading(true);
        setTimeout(() => {
            setBudget(newBudget);
            localStorage.setItem('user-budget', JSON.stringify(newBudget));
            setLoading(false);
        }, 1500);
    };

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