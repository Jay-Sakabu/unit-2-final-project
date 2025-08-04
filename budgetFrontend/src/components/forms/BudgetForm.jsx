import { useState } from "react";


const BudgetForm = ({ onSubmitBudget }) => {
    const [type, setType] = useState('monthly');
    const [amount, setAmount] = useState('');
    const [monthCount, setMonthCount] = useState(1);
    const [averages, setAverages] = useState(['']);
    const [errorMessage, setErrorMessage] = useState("");

    // Reset all inputs to initial state
    const reset = () => {
        setAmount('');
        setMonthCount(1);
        setAverages(['']);
    };

    // Calculate the monthly income and derive budget categories
    const calculateBudget = () => {
        let monthly = 0;

        // Monthly income is used directly
        if (type === 'monthly') {
            monthly = Number(amount);
        }
        else if (type === 'annual') {
            monthly = Number(amount) / 12;
        }
        // Average of X months is calculated from user inputs
        else {
            const nums = averages.map(Number).filter(n => !isNaN(n));
            //Realistically, this code probably won't be reached because the browser will complain at the user to fill out the month values anyways
            if (nums.length !== monthCount) {
                setErrorMessage("Error! Please enter values for every month!");
                return null;
            }

            monthly = nums.reduce((sum, n) => sum + n, 0) / monthCount;
        }

        // Validate that the monthly value is a positive number
        if (!monthly || monthly <= 0) {
            setErrorMessage("Error! Please enter a positive number for months!");
            return null;
        }

        // Clear error state before returning valid budget
        setErrorMessage("");
        return {
            monthlyIncome: monthly,
            needs: monthly * 0.5,
            wants: monthly * 0.3,
            savings: monthly * 0.2,
        };
    };

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault();
        const budget = calculateBudget(); // Try to compute budget
        if (budget) {
            onSubmitBudget(budget); // Pass budget up to parent
            reset(); // Reset form fields
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dashboard-box" id="budget-form">
            <h2>Enter Your Income</h2>

            {/* Income type selection (monthly, annual, average of X months) */}
            <div className="income-types-group">
                {['monthly', 'annual', 'average'].map(option => (
                    <label key={option} className="income-types-option">
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

            {/* If 'average' is selected, show inputs for number of months and their values */}
            {type === 'average' ? (
                <>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={monthCount}
                        onChange={e => {
                            let count = Number(e.target.value) || 1;
                            if(count > 12){
                                count = 12;
                            }
                            setMonthCount(count);
                            setAverages(Array(count).fill('')); // Reset averages array
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
                                setAverages(copy); // Update specific month's value
                            }}
                            required
                        />
                    ))}
                </>
            ) : (
                // Input for monthly or annual amount depending on selection
                <input
                    type="number"
                    placeholder={type === 'annual' ? 'Annual amount' : 'Monthly amount'}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    id="income-frequency"
                    required
                />
            )}

            {/* Submit button */}
            <button type="submit">Calculate</button>

            {/* Display error if one exists */}
            {errorMessage && (
                <p style={{ color: 'red', fontSize: '30px' }}>{errorMessage}</p>
            )}
        </form>
    );
}

export default BudgetForm;