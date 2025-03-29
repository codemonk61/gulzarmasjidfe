import { Button, Grid, TextField, Typography } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import React from 'react';

type ExpenseFormProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    datum: { name: string; expenseAmount: string, _id: string };
    handleEditExpenseClick: ()=> void
};

const ExpensesForm: React.FC<ExpenseFormProps> = ({ handleEditExpenseClick, datum, handleChange }) => {
    const { name, expenseAmount, _id } = datum;

    return (
        <>
        <Typography variant="body1" sx={{marginTop: "10px"}}>Edit Item</Typography>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '10px',marginTop: '10px' }}>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
    
                <TextField
                    id={'name'}
                    name="name"
                    size="medium"
                    label="Name"
                    color="success"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={handleChange} // No need for `(e) => handleChange(e)`, just pass it directly.
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                <TextField
                    id={'expenseAmount'}
                    name="expenseAmount"
                    size="medium"
                    label="Amount"
                    color="success"
                    fullWidth
                    margin="normal"
                    value={expenseAmount}
                    onChange={handleChange} // Same here.
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                <Button onClick={handleEditExpenseClick} variant="contained" color='success' size="small">Edit</Button>
            </Grid>
        </Grid>
        </>
    );
};

export default ExpensesForm;
