
import { Button, Grid, TextField, Typography } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import React, { useState, ChangeEvent } from 'react';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { addExpenses } from '../api/fetch';
import RemoveIcon from '@mui/icons-material/Remove';

type ExpenditureType = {
    name: string;
    expenseAmount: string;
};

const AddExpenditure = () => {

    const [expenditures, setExpenditures] = useState<ExpenditureType[]>([{ name: "", expenseAmount: "" }]);
    const [loadingExpenses, setLoadingExpenses] = useState(false)

    const handleAddExpenditure = () => {
        setExpenditures([...expenditures, { name: "", expenseAmount: "" }]);
    };

    const removeExpandature = (key: number) => {
        let updatedExpandature = expenditures.filter((_, index)=>{
           return  index !== key
        })
        setExpenditures(updatedExpandature)
    }

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedExpenditures = [...expenditures];
        updatedExpenditures[index] = { ...updatedExpenditures[index], [name]: value };
        setExpenditures(updatedExpenditures);
    };

    const addExpensesToDB = async() => {
        setLoadingExpenses(true)
        try{
        await addExpenses(expenditures)
        setLoadingExpenses(false)
        alert("Expenses added Successfully")
        }catch(e){
         alert("Expenses not added")
         setLoadingExpenses(false)
        }
    }

    const isDisable = expenditures.every((value)=> (value.name && value.expenseAmount))

    return (
        <PageContainer title='Add Expenditure'>
            {expenditures.map((datum, index)=>{
                return(
                    <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={index}
                    sx={{marginBottom: "10px"}}
                >
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5} >
                        <Typography variant="h5" border="ActiveBorder">Item {index + 1}</Typography>
                        <TextField
                            name="name"
                            size="medium"
                            label="Name"
                            color="success"
                            fullWidth
                            margin="normal"
                            value={datum.name}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                    <Typography variant="h5" sx={{visibility: 'hidden'}}>.</Typography>
                        <TextField
                            name="expenseAmount"
                            size="medium"
                            label="amount"
                            color="success"
                            fullWidth
                            margin="normal"
                            value={datum.expenseAmount}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <Typography variant="h5" sx={{visibility: 'hidden'}}>.</Typography>
                        {index === expenditures.length - 1 ? 
                            <Button onClick={handleAddExpenditure} variant="outlined" color='success' size='medium'>
                                <AddSharpIcon sx={{ height: "24px", width: "24px" }} />
                            </Button>
                            :
                            <Button onClick={()=>removeExpandature(index)} variant="outlined" color='success' size='medium'>
                                <RemoveIcon sx={{ height: "24px", width: "24px" }} />
                            </Button>
                        }
                    </Grid>
                </Grid>
                )
            })
            }
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <Button disabled={!isDisable} loading={loadingExpenses} onClick={addExpensesToDB} variant="contained" color="success" size="medium" fullWidth={false}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AddExpenditure;
