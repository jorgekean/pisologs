import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { Income } from "./income-form";

interface IncomeCardProps {
    income: Income;
    onUpdate: (updatedIncome: Income) => void;
    onCancel: () => void;
    onDelete: (income: Income) => void;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income, onUpdate, onCancel, onDelete }) => {
    const handleUpdate = () => {
        // Implement the update logic
        // You can use the onUpdate callback to pass the updated income data to the parent component
    };

    const handleCancel = () => {
        // Implement the cancel logic
        // You can use the onCancel callback to notify the parent component about the cancellation
    };

    return (
        <Box borderWidth="1px" borderRadius="md" p={4}>
            <Text>Date: {income.date}</Text>
            <Text>Source: {income.source}</Text>
            <Text>Amount: {income.amount}</Text>
            <Text>Description: {income.description}</Text>

            {/* <Button colorScheme="blue" mt={4} onClick={handleUpdate}>
                Update
            </Button> */}
            {/* <Button colorScheme="red" mt={4} ml={2} onClick={() => onDelete(income)}>
                Delete
            </Button> */}
            <IconButton icon={<DeleteIcon />} onClick={() => onDelete(income)} aria-label={"delete"} />
            {/* <Button colorScheme="gray" mt={4} ml={2} onClick={handleCancel}>
                Cancel
            </Button> */}
        </Box>
    );
};

export default IncomeCard;
