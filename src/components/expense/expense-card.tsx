import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Expense } from "./expense-form";

interface ExpenseCardProps {
    expense: Expense;
    onUpdate: (updatedExpense: Expense) => void;
    onCancel: () => void;
    onDelete: (updatedExpense: Expense) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onUpdate, onCancel, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedExpense, setUpdatedExpense] = useState(expense);

    const handleDelete = () => {
        if (onDelete) {
            onDelete(expense);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleUpdate = () => {
        onUpdate(updatedExpense);
        setEditMode(false);
    };

    const handleCancel = () => {
        setUpdatedExpense(expense);
        setEditMode(false);
        onCancel();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUpdatedExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    return (
        <Box borderWidth="1px" borderRadius="md" p={4}>
            <Text>
                Date: {editMode ? <input type="date" name="date" value={updatedExpense.date} onChange={handleInputChange} /> : expense.date}
            </Text>
            <Text>
                Category:{" "}
                {editMode ? (
                    <input type="text" name="category" value={updatedExpense.category} onChange={handleInputChange} />
                ) : (
                    expense.category
                )}
            </Text>
            <Text>
                Price: {editMode ? <input type="number" name="price" value={updatedExpense.price} onChange={handleInputChange} /> : expense.price}
            </Text>
            <Text>
                Quantity:{" "}
                {editMode ? (
                    <input type="number" name="quantity" value={updatedExpense.quantity} onChange={handleInputChange} />
                ) : (
                    expense.quantity
                )}
            </Text>
            <Text>Amount: {expense.price * expense.quantity}</Text>
            <Text>
                Description:{" "}
                {editMode ? (
                    <Textarea value={updatedExpense.description} onChange={(e) => handleInputChange} />
                ) : (
                    expense.description
                )}
            </Text>

            {editMode ? (
                <>
                    <Button colorScheme="green" mt={4} onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button colorScheme="gray" mt={2} onClick={handleCancel}>
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <IconButton mr={2} icon={<EditIcon />} onClick={handleEdit} aria-label={"edit"} />
                    <IconButton icon={<DeleteIcon />} onClick={handleDelete} aria-label={"delete"} />
                    {/* <Button colorScheme="red" mt={4} onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button colorScheme="blue" mt={2} onClick={handleEdit}>
                        Edit
                    </Button> */}
                </>
            )}
        </Box>
    );
};

export default ExpenseCard;
