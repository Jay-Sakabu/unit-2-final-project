import { useState, useEffect, useMemo } from "react";
import transactionsData from "../../assets/transactions.json";

// Helper function to normalize dates, previous iteration allowed for blank date entries, parsing blanks using slice() on those entries would cause crashes
function normalizeDateString(date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return ""; // Return empty if invalid date
    }
    return parsedDate.toISOString().slice(0, 7); // Ensure it returns 'YYYY-MM' format
}

// Helper function to display dates in "(Month) (Year) Format"
const formatMonthYear = (monthString) => {
    const [year, month] = monthString.split("-"); // Split monthString into year and month, they're separated by "-"
    const date = new Date(Number(year), Number(month) - 1); // Subtract 1 from "month", the months from Date are zero based
    const monthAndYear = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, monthAndYear);
}

// Main Function
const TransactionHistory = ({ onCategoryTotals }) => {
    const [transactions, setTransactions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        description: "",
        amount: 0,
        date: "",
        category: "Needs",
    });
    const [newDescription, setNewDescription] = useState("");
    const [newAmount, setNewAmount] = useState(0);
    const [newCategory, setNewCategory] = useState("Needs");
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    // Using Date.now() here because it always generates a number, and can use it as an id reliably without worrying about user-side collisions. Concerned about backend collisions if multiple users try to edit/add at the same time
    // Might need to revise how transactions are stored in the future
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        let initial = storedTransactions ? JSON.parse(storedTransactions) : transactionsData;
        const sanitizedData = initial.map((transaction) => ({
            ...transaction,
            id: transaction.id ?? Date.now(),              // ensure an id exists
            date: normalizeDateString(transaction.date),
        }));
        setTransactions(sanitizedData);
        if (!storedTransactions) {
            localStorage.setItem("transactions", JSON.stringify(sanitizedData));
        }

    }, []);

    // Save the updated transactions to localStorage
    const saveToLocal = (updatedTransactions) => {
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        console.log(updatedTransactions);
    };

    // Filter transactions and then Delete by id
    const handleDelete = (idToDelete) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== idToDelete);
        setTransactions(updatedTransactions);
        saveToLocal(updatedTransactions);
    };

    // Start editing by id and fill the edit form with its transaction data
    const startEdit = (idToEdit) => {
        const transaction = transactions.find((transaction) => transaction.id === idToEdit);
        setEditingId(idToEdit);
        setEditForm({ ...transaction });
    };

    // Cancel editing and reset form state
    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({
            id: null,
            description: "",
            amount: 0,
            date: "",
            category: "Needs",
        });
    };

    // Handle form input changes during editing
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Save the edited transaction and save to localStorage
    const handleSaveEdit = () => {
        const index = transactions.findIndex((transaction) => transaction.id === editingId);
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = {
            ...editForm,
            amount: parseFloat(editForm.amount),
            date: normalizeDateString(editForm.date),
        };
        setTransactions(updatedTransactions);
        saveToLocal(updatedTransactions);
        cancelEdit();
    };

    // Add new
    const handleAddTransaction = (event) => {
        event.preventDefault();
        const newTransaction = {
            id: Date.now(),
            date: selectedMonth,
            description: newDescription,
            amount: parseFloat(newAmount),
            category: newCategory,
        };
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        saveToLocal(updatedTransactions);
        setNewDescription("");
        setNewAmount(0);
        setNewCategory("Needs");
    };

    // only show the month the user has picked & use memoization to cache results
    // Previously ran into error "Maximum update depth exceeded, caused by calling setState inside useEffect"
    const filteredTransactions = useMemo(() =>
        transactions.filter((transaction) => transaction.date === selectedMonth),
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

    const EditableRow = ({ form, onChange, onSave, onCancel }) => (
        <tr>
            <td>{form.date}</td>
            <td>
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={onChange}
                />
            </td>
            <td>
                <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                >
                    <option>Needs</option>
                    <option>Wants</option>
                    <option>Savings</option>
                </select>
            </td>
            <td>
                <input
                    type="number"
                    name="amount"
                    min="0"
                    value={form.amount}
                    onChange={onChange}
                />
            </td>
            <td>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </td>
        </tr>
    );

    // Row for normal display mode with edit/delete buttons
    const ReadOnlyRow = ({ transaction, onEdit, onDelete }) => (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>
                <button
                    style={{ color: "blue" }}
                    onClick={onEdit}
                >
                    Edit
                </button>
                <button
                    style={{ color: "red" }}
                    onClick={onDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    );

    return (
        <div className="dashboard-box">
            <h2>Transaction History</h2>
            <label>
                View Month:
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    id="selectMonth"
                />
            </label>

            <h3>Add Transaction</h3>
            {/* TODO: Make this its own form */}
            <form onSubmit={handleAddTransaction}>
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                    id="descriptionTextbox"
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    min="0"
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                    id="transactionAmount"
                    required
                />
                <select
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    id="categoryDropdownMenu"
                >
                    <option>Needs</option>
                    <option>Wants</option>
                    <option>Savings</option>
                </select>
                <button
                    type="submit"
                    disabled={!newDescription || isNaN(newAmount) || newAmount <= 0}
                >
                    Add
                </button>
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
                        {filteredTransactions.map((transaction) =>
                            editingId === transaction.id ? (
                                <EditableRow
                                    key={transaction.id}
                                    form={editForm}
                                    onChange={handleEditChange}
                                    onSave={handleSaveEdit}
                                    onCancel={cancelEdit}
                                />
                            ) : (
                                <ReadOnlyRow
                                    key={transaction.id}
                                    transaction={transaction}
                                    onEdit={() => startEdit(transaction.id)}
                                    onDelete={() => handleDelete(transaction.id)}
                                />
                            )
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;