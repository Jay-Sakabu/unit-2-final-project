import { useState, useEffect, useMemo, useContext } from "react";
import { AuthContext } from "../auth-context/AuthContext";
import api from "../api-axios/api";

// Helper function to display dates in "(Month) (Year) Format"
const formatMonthYear = (monthString) => {
    const [year, month] = monthString.split("-"); // Split monthString into year and month, they're separated by "-"
    const date = new Date(Number(year), Number(month) - 1); // Subtract 1 from "month", the months from Date are zero based
    const monthAndYear = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, monthAndYear);
}

// Main Function
const TransactionHistory = ({ onCategoryTotals }) => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ date: "", description: "", amount: "", category: "Needs" });
    const [transactions, setTransactions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    // Load transactions for user
    useEffect(() => {
        if (!user) return;
        api
            .get('/transactions', { params: { userId: user.id } })
            .then(response => setTransactions(response.data))
            .catch(() => setError("Failed to load transactions! Is the backend running?"));
    }, [user]);

    // Build payload for add/edit using form.date directly
    const buildPayload = () => ({
        ...form,
        amount: parseFloat(form.amount),
        date: form.date,
        category: form.category,
        user: { id: user.id }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingId) {
                const response = await api.put(`/transactions/${editingId}`, buildPayload(), { params: { userId: user.id } });
                setTransactions(transactions.map(transaction => transaction.id === editingId ? response.data : transaction));
            } else {
                const response = await api.post('/transactions', buildPayload(), { params: { userId: user.id } });
                setTransactions([...transactions, response.data]);
            }
            setForm({ date: "", description: "", amount: "", category: "Needs" });
            setEditingId(null);
        } catch {
            setError(editingId ? "Update failed" : "Add failed");
        }
    };

    const handleDelete = (id) => {
        api
            .delete(`/transactions/${id}`, { params: { userId: user.id } })
            .then(() => setTransactions(transactions.filter(transaction => transaction.id !== id)))
            .catch(() => setError("Delete failed"));
    };

    // only show the month the user has picked & use memoization to cache results
    // Previously ran into error "Maximum update depth exceeded, caused by calling setState inside useEffect"
    const filteredTransactions = useMemo(() =>
        transactions.filter((transaction) => transaction.date.slice(0, 7) === selectedMonth), //Dates are such a pain, 0,7 to guarantee month format
        [transactions, selectedMonth]
    );
    // compute totals by category for this month
    const categoryTotals = useMemo(() =>
        filteredTransactions.reduce((totals, transaction) => {
            totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
            return totals;
        },
            { Needs: 0, Wants: 0, Savings: 0 }),
        [filteredTransactions]
    );

    // fire to parent / Graph.jsx
    useEffect(() => {
        onCategoryTotals && onCategoryTotals(categoryTotals);
    }, [categoryTotals, onCategoryTotals]);

    return (
        <div className="dashboard-box">
            <h2>Transaction History</h2>
            {error && <p className="error-message">{error}</p>}

            <label htmlFor="selectMonth">View Month:
                <input
                    type="month"
                    id="selectMonth"
                    value={selectedMonth}
                    onChange={event => setSelectedMonth(event.target.value)}
                />
            </label>

            <h3>{editingId ? 'Edit Transaction' : 'Add Transaction'}</h3>
            <form onSubmit={handleSubmit} className="transaction-form">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={event => setForm(form => ({ ...form, date: event.target.value }))}
                    id="dateInput"
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={event => setForm(form => ({ ...form, description: event.target.value }))}
                    id="descriptionTextbox"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    min="0"
                    value={form.amount}
                    onChange={event => setForm(form => ({ ...form, amount: event.target.value }))}
                    id="transactionAmount"
                    required
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={event => setForm(form => ({ ...form, category: event.target.value }))}
                    id="categoryDropdownMenu"
                >
                    <option>Needs</option>
                    <option>Wants</option>
                    <option>Savings</option>
                </select>
                <button
                    type="submit"
                    disabled={!form.description || isNaN(form.amount) || form.amount <= 0}
                >
                    {editingId ? 'Save' : 'Add'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm({ date: "", description: "", amount: "", category: "Needs" }); }} className="cancelButton">
                        Cancel
                    </button>
                )}
            </form>

            {/* If no transaction display placeholder */}
            {filteredTransactions.length === 0 ? (
                <p>No transactions for {formatMonthYear(selectedMonth)}!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.category}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => { setEditingId(transaction.id); setForm(transaction); }} className="editButton">Edit</button>
                                    <button onClick={() => handleDelete(transaction.id)} className="deleteButton">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;