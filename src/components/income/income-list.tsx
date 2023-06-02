import { Box, Button, Grid, GridItem, IconButton, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DexieUtils from "../../utils/dexie-utils";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import IncomeCard from "./income-card";
import { Income } from "./income-form";

const IncomeList: React.FC = () => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
    const db = DexieUtils<Income>({ tableName: "incomeTransactions" });

    useEffect(() => {
        const fetchTransactions = async () => {
            await db.getAll().then(setIncomes);
        };
        fetchTransactions();
    }, []);

    const deleteIncome = async (income: Income) => {
        await db.deleteEntity(income.id);
        await db.getAll().then(setIncomes);
    };

    const updateIncome = async (updatedIncome: Income) => {
        await db.update(updatedIncome);
        await db.getAll().then(setIncomes);
        setEditingIncomeId(null);
    };

    const cancelEdit = () => {
        setEditingIncomeId(null);
    };

    const responsiveLayout = useBreakpointValue({ base: "cards", sm: "cards", md: "cards", lg: "table" });
    const responsiveColumns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 4 });

    return (
        <Box>
            <h2>Income List</h2>
            <Link to="/incomes/add">
                <IconButton icon={<AddIcon />} aria-label="Add Income" onClick={() => console.log("")} />
            </Link>
            {responsiveLayout === "table" ? (
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Source</Th>
                            <Th>Amount</Th>
                            <Th>Description</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {incomes.map((income) => (
                            <Tr key={income.id}>
                                <Td>{income.date}</Td>
                                <Td>{income.source}</Td>
                                <Td>{income.amount}</Td>
                                <Td>{income.description}</Td>
                                <Td>
                                    <IconButton icon={<EditIcon />} onClick={() => console.log(income)} aria-label="edit" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => deleteIncome(income)} aria-label="delete" />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
                    {incomes.map((income) => (
                        <GridItem key={income.id}>
                            <IncomeCard
                                income={income}
                                onUpdate={updateIncome}
                                onCancel={cancelEdit}
                                onDelete={deleteIncome}
                            />
                        </GridItem>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default IncomeList;
