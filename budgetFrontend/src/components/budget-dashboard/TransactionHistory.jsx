import { useState, useEffect } from "react";
import transactionsData from "../../assets/transactions.json";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({ description: "", amount: 0, date: "" });
    const [newDescription, setNewDescription] = useState("");
    const [newAmount, setNewAmount] = useState(0);

    // Check if there is a local transactions data, if so parse that data, else use the stored sample data
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        } else {
            setTransactions(transactionsData);
            localStorage.setItem("transactions", JSON.stringify(transactionsData));
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
        setEditForm({ description: "", amount: 0, date: "" });
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

    // Sum all positive amounts to calculate income
    const income = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Sum all negative amounts to calculate expenses
    const expenses = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Row for editing mode with inputs and save/cancel buttons
    const EditableRow = ({ form, onChange, onSave, onCancel }) => (
        <tr>
            <td>
                <input type="text" name="date" value={form.date} onChange={onChange} />
            </td>
            <td>
                <input type="text" name="description" value={form.description} onChange={onChange} />
            </td>
            <td>
                <input type="number" name="amount" value={form.amount} onChange={onChange} />
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
            <td>
                {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td>
                <button style={{ color: "blue" }} onClick={onEdit}>Edit</button>
                <button style={{ color: "red" }} onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );

    return (
        <div className="dashboard-box">
            <h2>Transaction History</h2>
            <h3>Add Transaction</h3>

            {/* Form to add new transactions */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const newTransaction = {
                        date: new Date().toISOString().slice(0, 10),
                        description: newDescription,
                        amount: parseFloat(newAmount),
                    };
                    const updatedTransactions = [...transactions, newTransaction];
                    setTransactions(updatedTransactions);
                    saveToLocal(updatedTransactions);
                    setNewDescription("");
                    setNewAmount("");
                }}
            >
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
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                    required
                />
                <button type="submit" disabled={newAmount == 0 || isNaN(newAmount)}>Add</button>
            </form>

            {/* Income and expense totals, might change later */}
            <p>Total Income: ${income.toFixed(2)}</p>
            <p>Total Expenses: -${Math.abs(expenses).toFixed(2)}</p>

            {/* Transactions table with editable and static rows */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) =>
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