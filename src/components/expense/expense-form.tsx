import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import DexieUtils from "../../utils/dexie-utils";

export interface Expense {
    id: string;
    date: string;
    category: string;
    price: number;
    quantity: number;
    amount: number;
    description: string;
    transactionReference?: string;

    // onDelete?: () => void;
    onEdit?: () => void;
}

// interface ExpenseFormProps {
//     addExpense?: (expense: Expense) => void;
// }

const ExpenseForm: React.FC = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [formError, setFormError] = useState("");
    const [transactionReference, setTransactionReference] = useState("");

    const db = DexieUtils<Expense>({ tableName: "expenseTransactions" });

    const addExpense = async (expense: Expense) => {
        const id = await db.add(expense);
    };

    const handleAddExpense = async () => {
        if (!date || !category || !price || !quantity) {
            setFormError("Please fill in all required fields.");
            return;
        }

        const newExpense: Expense = {
            id: Date.now().toString(),
            date,
            category,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            amount: parseInt(quantity) * parseFloat(price),
            description,
            transactionReference
        };

        addExpense(newExpense);

        setDate(new Date().toISOString().split("T")[0]);
        setCategory("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setTransactionReference("");
        setFormError("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "date") setDate(value);
        if (name === "category") setCategory(value);
        if (name === "price") setPrice(value);
        if (name === "quantity") setQuantity(value);
    };

    return (
        <Box>
            <h2>Add Expense</h2>
            <FormControl isRequired isInvalid={!date}>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" value={date} onChange={handleInputChange} />
                <FormErrorMessage>Please enter a date.</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!category}>
                <FormLabel>Category</FormLabel>
                <Input type="text" name="category" value={category} onChange={handleInputChange} placeholder="Category" />
                <FormErrorMessage>Please enter a category.</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!price}>
                <FormLabel>Price</FormLabel>
                <Input type="number" name="price" value={price} onChange={handleInputChange} placeholder="Price" />
                <FormErrorMessage>Please enter a price.</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!quantity}>
                <FormLabel>Quantity</FormLabel>
                <Input type="number" name="quantity" value={quantity} onChange={handleInputChange} placeholder="Quantity" />
                <FormErrorMessage>Please enter a quantity.</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </FormControl>
            <FormControl>
                <FormLabel>Transaction Reference</FormLabel>
                <Input
                    type="text"
                    name="transactionReference"
                    value={transactionReference}
                    onChange={(e) => setTransactionReference(e.target.value)}
                    placeholder="Transaction Reference"
                />
            </FormControl>
            {formError && (
                <Box color="red" mt={2}>
                    {formError}
                </Box>
            )}
            <Box mt="4">
                <Button onClick={handleAddExpense} mr="2">Add Expense</Button>
                <Link to="/expenses">
                    <Button >Go back</Button>
                </Link>
            </Box>

            {/* 
<Button colorScheme="whiteAlpha" onClick={handleAddExpense}>
                        <FaSave size={"28px"} />
                    </Button>
            <IconButton
                icon={<FaSave />}
                colorScheme="blue"
                onClick={handleAddExpense}
                aria-label="Save Expense"
            /> */}
        </Box>
    );
};

export default ExpenseForm;
