import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PageContainer } from '@toolpad/core';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import { deleteExpense, getExpenses, updateExpense } from '../api/fetch';
import Loader from '../components/Loader';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpensesForm from '../components/ExpensesForm';



const AllExpendature = () => {

    const [selectedCard, setSelectedCard] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false)
    const [expenseData, setExpanseData] = React.useState({ name: "", expenseAmount: "", _id: "" })

    let expense = {}

    const [id, setId] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpanseData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const setExpenseDataAndId = (e: any, data: any) => {
        e.stopPropagation()
        setId(data._id)
        setExpanseData(data)
    }

    React.useEffect(() => {
        const fetchExpensesData = async () => {
            setLoading(true)
            try {
                const data = await getExpenses()
                setSelectedCard(data)
                setLoading(false)
            } catch (e) {
                alert("Faild to get Expenses")
                setLoading(false)
            }

        }
        fetchExpensesData();
    }, [])

    const handleEditExpenseClick = async () => {
        setLoading(true)
        try {
            await updateExpense(id, expenseData)
            const data = await getExpenses()
            setSelectedCard(data)
            setId("")
            setLoading(false)
        } catch (e) {
            alert(`${e}`,)
        }

    }

    const handleExpenseDelete = async (removeId: string) => {
        setLoading(true)
        try {
            await deleteExpense(removeId)
            const data = await getExpenses()
            setSelectedCard(data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    if (loading) {
        return <PageContainer ><Loader /></PageContainer>

    }

    if (Object.keys(selectedCard).length === 0) {
        return <Loader />
    }

    return (
        <>
            <PageContainer title={"Items Expenses"}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                        gap: 2,
                    }}
                >
                    {selectedCard.itemExpenses.length ? selectedCard.itemExpenses.map((card: any, index: number) => (
                        <Card key={index} sx={{ position: "relative" }}>
                            <div style={{ zIndex: 1, display: "flex", alignItems: "center", gap: "4px", position: "absolute", top: "10px", right: "10px" }}>

                                <button
                                    onClick={(e) => setExpenseDataAndId(e, card)}
                                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                                >
                                    <EditIcon sx={{ height: '20px', width: "20px" }} />
                                </button>

                                <button
                                    onClick={(e) => handleExpenseDelete(card._id)}
                                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                                >
                                    <DeleteIcon sx={{ height: '20px', width: "20px" }} />
                                </button>

                            </div>
                            <CardActionArea
                                data-active={selectedCard === index ? '' : undefined}
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        <CurrencyRupeeSharpIcon />{card.expenseAmount}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                :
                <Typography variant='subtitle1' color='error'>No Expense Item Found</Typography>
                }
                </Box>
                {id && <ExpensesForm handleEditExpenseClick={handleEditExpenseClick} datum={expenseData} handleChange={handleChange} />}
            </PageContainer>
            <PageContainer title={"Sub Total"}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                        gap: 2,
                    }}
                >
                    {selectedCard.subTotal.length ?  selectedCard.subTotal.map((card: any, index: number) => {



                        return (
                            <Card key={index}>
                                <CardActionArea
                                    onClick={() => setSelectedCard(index)}
                                    data-active={selectedCard === index ? '' : undefined}
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }}>
                                        <Typography variant="h5" component="div">
                                            <CurrencyRupeeSharpIcon />{card.expenseAmount}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    }

                    )
                    :
                    <Typography variant='subtitle1' color='error'>No Expanse Found</Typography>
                }

                </Box>

            </PageContainer>
        </>
    );
}

export default AllExpendature;
