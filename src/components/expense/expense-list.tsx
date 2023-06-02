import { Box, Button, Grid, GridItem, IconButton, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DexieUtils from "../../utils/dexie-utils";
import ExpenseForm, { Expense } from "./expense-form";
import ExpenseCard from "./expense-card";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const ExpenseList: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
    const db = DexieUtils<Expense>({ tableName: "expenseTransactions" });

    useEffect(() => {
        const fetchTransactions = async () => {
            await db.getAll().then(setExpenses);
        };
        fetchTransactions();
    }, []);

    const deleteExpense = async (expense: Expense) => {
        await db.deleteEntity(expense.id);
        await db.getAll().then(setExpenses);
    };

    const updateExpense = async (updatedExpense: Expense) => {
        await db.update(updatedExpense);
        await db.getAll().then(setExpenses);

        setEditingExpenseId(null);
    };

    const cancelEdit = () => {
        setEditingExpenseId(null);
    };

    const responsiveLayout = useBreakpointValue({ base: "cards", sm: "cards", md: "cards", lg: "table" });
    const responsiveColumns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 4 });

    return (
        <Box>
            <h2>Expense List</h2>
            <Link to="/expenses/add">
                <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Expense"
                    onClick={() => console.log("")}
                />
            </Link>
            {responsiveLayout === "table" ? (
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Category</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Amount</Th>
                            <Th>Description</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {expenses.map((expense) => (
                            <Tr key={expense.id}>
                                <Td>{expense.date}</Td>
                                <Td>{expense.category}</Td>
                                <Td>{expense.price}</Td>
                                <Td>{expense.quantity}</Td>
                                <Td>{expense.price * expense.quantity}</Td>
                                <Td>{expense.description}</Td>
                                <Td>
                                    <IconButton icon={<EditIcon />} onClick={() => console.log(expense)} aria-label={"edit"} />
                                    <IconButton icon={<DeleteIcon />} onClick={() => deleteExpense(expense)} aria-label={"delete"} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
                    {expenses.map((expense) => (
                        <GridItem key={expense.id}>
                            <ExpenseCard
                                expense={expense}
                                onUpdate={updateExpense}
                                onCancel={cancelEdit}
                                onDelete={deleteExpense}
                            />
                        </GridItem>
                    ))}
                </Grid>
            )}
            {/* <ExpenseForm addExpense={addExpense} /> */}
        </Box>
    );
};

export default ExpenseList;
