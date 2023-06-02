import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import DexieUtils from "../../utils/dexie-utils";

// interface IncomeFormProps {
//     addIncome: (income: Income) => void;
// }

export interface Income {
    id: string;
    date: string;
    source: string;
    amount: number;
    description: string;
    transactionReference?: string;

}

const IncomeForm: React.FC = () => {
    const [date, setDate] = useState("");
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [transactionReference, setTransactionReference] = useState("");


    const db = DexieUtils<Income>({ tableName: "incomeTransactions" });

    const addIncome = async (expense: Income) => {
        const id = await db.add(expense);
    };


    const handleAddIncome = () => {
        const newIncome: Income = {
            id: Date.now().toString(),
            date,
            source,
            amount: parseFloat(amount),
            description,
            transactionReference
        };

        addIncome(newIncome);

        setDate("");
        setSource("");
        setAmount("");
        setDescription("");
        setTransactionReference("");
    };

    return (
        <Box>
            <h2>Add Income</h2>
            <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Source</FormLabel>
                <Input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </FormControl>
            <FormControl>
                <FormLabel>Transaction Reference</FormLabel>
                <Textarea value={transactionReference} onChange={(e) => setTransactionReference(e.target.value)} placeholder="Transaction Reference" />
            </FormControl>
            <Button onClick={handleAddIncome}>Add Income</Button>
        </Box>
    );
};

export default IncomeForm;
