import { useState } from "react";

//TODO: Add some comments for ease of explanation for presentation, mostly fine
//Alerts might not be working proper on netlify?

const BudgetForm = ({ onSubmitBudget }) => {
    const [type, setType] = useState('monthly');
    const [amount, setAmount] = useState('');
    const [monthCount, setMonthCount] = useState(1);
    const [averages, setAverages] = useState(['']);

    const reset = () => {
        setAmount('');
        setMonthCount(1);
        setAverages(['']);
    };

    const calculateBudget = () => {
        let monthly = 0;
        if (type === 'monthly') {
            monthly = Number(amount);
        } else if (type === 'annual') {
            monthly = Number(amount) / 12;
        } else {
            const nums = averages.map(Number).filter(n => !isNaN(n));
            if (nums.length !== monthCount) {
                alert('Please fill in all month values.');
                return null;
            }
            monthly = nums.reduce((sum, n) => sum + n, 0) / monthCount;
        }
        if (!monthly || monthly <= 0) {
            alert('Enter a positive number.');
            return null;
        }
        return {
            monthlyIncome: monthly,
            needs: monthly * 0.5,
            wants: monthly * 0.3,
            savings: monthly * 0.2,
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        const budget = calculateBudget();
        if (budget) {
            onSubmitBudget(budget);
            reset();
        }
    };

    return (
        //TODO: budget-form doesn't exist
        <form onSubmit={handleSubmit} className="dashboard-box" id="budget-form">
            <h2>Enter Your Income</h2>
            <div>
                {['monthly', 'annual', 'average'].map(option => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="type"
                            value={option}
                            checked={type === option}
                            onChange={e => { setType(e.target.value); reset(); }}
                        />
                        {option === 'average' ? 'Average of X Months' : option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                ))}
            </div>

            {type === 'average' ? (
                <>
                    <input
                        type="number"
                        min="1"
                        value={monthCount}
                        onChange={e => {
                            const count = Number(e.target.value) || 1;
                            setMonthCount(count);
                            setAverages(Array(count).fill(''));
                        }}
                        placeholder="Months to average"
                        required
                    />
                    {averages.map((value, index) => (
                        <input
                            key={index}
                            type="number"
                            value={value}
                            placeholder={`Month ${index + 1}`}
                            onChange={e => {
                                const copy = [...averages];
                                copy[index] = e.target.value;
                                setAverages(copy);
                            }}
                            required
                        />
                    ))}
                </>
            ) : (
                <input
                    type="number"
                    placeholder={type === 'annual' ? 'Annual amount' : 'Monthly amount'}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                />
            )}

            <button type="submit">Calculate</button>
        </form>
    );
}

export default BudgetForm;