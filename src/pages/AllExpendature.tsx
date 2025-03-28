import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PageContainer } from '@toolpad/core';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import { getExpenses } from '../api/fetch';
import Loader from '../components/Loader';



const AllExpendature = () => {

    const [selectedCard, setSelectedCard] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false)

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

    if (loading) {
        return <Loader />
       
    }

    if(Object.keys(selectedCard).length === 0){
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
                    {selectedCard && selectedCard.itemExpenses.map((card: any, index: number) => (
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
                    ))}
                </Box>
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
                    {selectedCard && selectedCard.subTotal.map((card: any, index: number) => {

                        
                        
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

                    )}

                </Box>

            </PageContainer>
        </>
    );
}

export default AllExpendature;
