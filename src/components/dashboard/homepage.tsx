import React, { useEffect, useState } from 'react'
import DexieUtils from "../../utils/dexie-utils";
import { Expense } from '../expense/expense-form';
import ExpenseList from '../expense/expense-list';
import { Income } from '../income/income-form';
import IncomeList from '../income/income-list';

const HomePage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);

    const dbExpense = DexieUtils<Expense>({ tableName: "expenseTransactions" });
    const dbIncome = DexieUtils<Income>({ tableName: 'incomeTransactions' });

    useEffect(() => {
        const fetchTransactions = async () => {
            await dbExpense.getAll().then(setExpenses);

            await dbIncome.getAll().then(setIncomes);
        };
        fetchTransactions();
    }, []);

    // Calculate the sum of expenses by transactionReference
    const expenseSums: { [key: string]: number } = expenses.reduce(
        (sums: { [key: string]: number }, expense) => {
            const { transactionReference, amount } = expense;
            if (transactionReference) {
                sums[transactionReference] = (sums[transactionReference] || 0) + amount;
            }
            return sums;
        },
        {}
    );

    // Calculate the sum of incomes by transactionReference
    const incomeSums: { [key: string]: number } = incomes.reduce(
        (sums: { [key: string]: number }, income) => {
            const { transactionReference, amount } = income;
            if (transactionReference) {
                sums[transactionReference] = (sums[transactionReference] || 0) + amount;
            }

            return sums;
        },
        {}
    );

    // Calculate the profit per TransactionReference
    const profitPerReference: { [key: string]: number } = {};
    Object.keys(expenseSums).forEach((reference) => {
        if (incomeSums[reference]) {
            profitPerReference[reference] = incomeSums[reference] - expenseSums[reference];
        }
    });

    // Format the amounts with commas and decimal places
    const formatAmount = (amount: number) => {
        return amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <>
            <div>homepage</div>
            <div>
                <h2>Expense Sums</h2>
                <ul>
                    {Object.entries(expenseSums).map(([reference, sum]) => (
                        <li key={reference}>
                            Reference: {reference} - Sum: {formatAmount(sum)}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Income Sums</h2>
                <ul>
                    {Object.entries(incomeSums).map(([reference, sum]) => (
                        <li key={reference}>
                            Reference: {reference} - Sum: {formatAmount(sum)}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Profits</h2>
                <ul>
                    {Object.entries(profitPerReference).map(([reference, profit]) => (
                        <li key={reference}>
                            Reference: {reference} - Profit: {formatAmount(profit)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default HomePage