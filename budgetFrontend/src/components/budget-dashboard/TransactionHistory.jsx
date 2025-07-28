import { useState, useEffect } from "react";
import transactionsData from "../../assets/transactions.json";

// Helper function to noramlize dates, previous iteration allowed for blank date entries, parsing blanks using slice() on those entries would cause crashes
function noramlizeDateString(date) {
    const parsedDate = new Date(date);
    if (typeof date !== "string" || isNaN(parsedDate.getTime())) {
        return "";
    }
    return parsedDate.toISOString().slice(0, 10);
}

// Main Function
const TransactionHistory = ({ onCategoryTotals }) => {
    const [transactions, setTransactions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({
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

    // Check if there is a local transactions data, if so parse that data, else use the stored sample data
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        let initial = storedTransactions ? JSON.parse(storedTransactions) : transactionsData;
        const sanitizedData = initial.map((transaction) => ({
            ...transaction,
            date: noramlizeDateString(transaction.date),
        }));
        setTransactions(sanitizedData);
        if (!storedTransactions) {
            localStorage.setItem("transactions", JSON.stringify(sanitizedData));
        }

    }, []);

    // Save the updated transactions to localStorage
    const saveToLocal = (updatedTransactions) => {
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    };

    // Loop through transactions, as long as i is not the indexToDelete, push that entry to an updated transactions array
    const handleDelete = (indexToDelete) => {
        const updatedTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            if (i !== indexToDelete) {
                updatedTransactions.push(transactions[i]);
            }
        }
        setTransactions(updatedTransactions);
        saveToLocal(updatedTransactions);
    };

    // Start editing: set index and fill the edit form with its transaction data
    const startEdit = (indexToEdit) => {
        setEditingIndex(indexToEdit);
        setEditForm(transactions[indexToEdit]);
    };

    // Cancel editing and reset form state
    const cancelEdit = () => {
        setEditingIndex(null);
        setEditForm({
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
        const updatedTransactions = [...transactions];
        updatedTransactions[editingIndex] = {
            ...editForm,
            amount: parseFloat(editForm.amount),
        };
        setTransactions(updatedTransactions);
        saveToLocal(updatedTransactions);
        cancelEdit();
    };

    const handleAddTransaction = (event) => {
        event.preventDefault();
        // force the day to today but month/year == selectedMonth
        const today = new Date();
        const dayString = today.getDate().toString().padStart(2, "0");
        const transactionDate = `${selectedMonth}-${dayString}`;

        const newTransaction = {
            date: transactionDate,
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

    // only show the month the user has picked
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.date.slice(0, 7) === selectedMonth
    );

    // compute totals by category for this month
    const categoryTotals = filteredTransactions.reduce(
        (totals, transaction) => {
            totals[transaction.category] =
                (totals[transaction.category] || 0) + transaction.amount;
            return totals;
        },
        { Needs: 0, Wants: 0, Savings: 0 }
    );

    // fire to parent / Graph.jsx
    useEffect(() => {
        if (onCategoryTotals) {
            onCategoryTotals(categoryTotals);
        }
    }, [categoryTotals, onCategoryTotals]);

    const EditableRow = ({ form, onChange, onSave, onCancel }) => (
        <tr>
            <td>
                <input type="date" name="date" value={form.date} onChange={onChange} />
            </td>
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
                />
            </label>

            <h3>Add Transaction</h3>
            <form onSubmit={handleAddTransaction}>
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    min="0"
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                    required
                />
                <select
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
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


            {/* Transactions table with editable and static rows */}
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
                    {filteredTransactions.map((transaction, index) =>
                        editingIndex === index ? (
                            <EditableRow
                                key={index}
                                form={editForm}
                                onChange={handleEditChange}
                                onSave={handleSaveEdit}
                                onCancel={cancelEdit}
                            />
                        ) : (
                            <ReadOnlyRow
                                key={index}
                                transaction={transaction}
                                onEdit={() => startEdit(index)}
                                onDelete={() => handleDelete(index)}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;