import Dexie from 'dexie';
import React, { useState, useEffect } from 'react';
import db from '../db'
import DexieUtils from '../utils/dexie-utils';
import {
    Table,
    Form,
    Button,
    Container,
    Row,
    Col,
} from 'react-bootstrap';


interface Transaction {
    id?: string;
    transactionDate: string;
    description: string;
    amount: number;
    quantity: number;
}

//   const db = new Dexie('expense-tracker');
// db.version(1).stores({
//   transaction: '++id, transactionDate, description, amount, quantity',
// });

const ExpenseTracker = () => {
    const db = DexieUtils<Transaction>({ tableName: 'expenseTransactions' });

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [formState, setFormState] = useState<Transaction>({
        transactionDate: '',
        description: '',
        amount: 0,
        quantity: 0,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formState.id) {
            // Update existing transaction
            await db.update(formState);
            await db.getAll().then(setTransactions);
        } else {
            // Add new transaction
            const id = await db.add(formState);
            // const newTransactions = await db.transactions.toArray();
            setTransactions([...transactions, { id, ...formState }]);
        }
        setFormState({ transactionDate: '', description: '', amount: 0, quantity: 0 });
    };

    const handleEdit = async (transaction: Transaction) => {
        setFormState(transaction);
    };

    const handleDelete = async (transaction: Transaction) => {
        if (transaction.id) {
            await db.deleteEntity(transaction.id);
            await db.getAll().then(setTransactions);
        }
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            await db.getAll().then(setTransactions);
        };
        fetchTransactions();
    }, []);

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8} lg={6}>
                    <h2>Expense Tracker</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTransactionDate">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="transactionDate"
                                value={formState.transactionDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={formState.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="amount"
                                placeholder="Enter amount"
                                value={formState.amount}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                value={formState.quantity}
                                onChange={handleInputChange}
                            /></Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Table className="mt-4" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.transactionDate}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.quantity}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleEdit(transaction)}
                                            >
                                                Edit
                                            </Button>{' '}
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(transaction)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default ExpenseTracker;

