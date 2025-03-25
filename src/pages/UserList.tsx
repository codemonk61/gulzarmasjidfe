import React, { useState, useEffect } from 'react'
import { fetchAllVillages, fetchSingleUser, Village } from '../api/fetch';
import Loader from '../components/Loader';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PageContainer } from '@toolpad/core';
import { Button, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import EditUser from './EditUser';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2f7d32",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


type UserListPropsType = {
    data?: Village[];
    hideSearchResult?: () => void,
    title?: string
}

const UserList: React.FC<UserListPropsType> = ({ data, hideSearchResult, title='User List'}) => {

    const [villages, setVillages] = useState<Village[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>('')

    const handleEdit = async (id: string) => {
       
        setUserId(id)
    }

    useEffect(() => {
        if (data?.length) {
            setVillages(data)
            setLoading(false);
        } else {

            const getVillages = async () => {
                try {
                    const data = await fetchAllVillages();
                    setVillages(data);
                } catch (error) {
                    console.error("Failed to load villages");
                } finally {
                    setLoading(false);
                }
            };

            title === 'User List' &&  getVillages();
        }

    }, []);

    if(data?.length === 0){
        return <></>
    }

    if (loading) {
        return <PageContainer title='User List'>
            <Grid justifyContent={"center"}>
                <Loader />
            </Grid>
        </PageContainer>
    }
    return (
        <>
            {userId ?
                <EditUser
                    id={userId}
                    handleEdit={handleEdit}
                    hideSearchResult={hideSearchResult}
                />
                :
                <PageContainer title={title}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700,  }} aria-label="customized table">
                            <TableHead >
                                <TableRow >
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="center">Amount</StyledTableCell>
                                    <StyledTableCell align="center">Mobile Number</StyledTableCell>
                                    <StyledTableCell align="center">Address</StyledTableCell>
                                    <StyledTableCell align="center">Payment Type</StyledTableCell>
                                    <StyledTableCell align="center">Payment Status</StyledTableCell>
                                    <StyledTableCell align="center">Sweet Received</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { villages.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.amount || 'NA'}</StyledTableCell>
                                        <StyledTableCell align="center">{row.mobileNumber || 'NA'}</StyledTableCell>
                                        <StyledTableCell align="center">{row.address}</StyledTableCell>
                                        <StyledTableCell align="center">{row.paymentStatus === 'completed' ? row.paymentType : 'NA'}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.paymentStatus === 'completed' ? <Chip label="Completed" color="success" size='small' /> : <Chip label="Pending" color="warning" size='small' />}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.sweetGiven ? 'YES' : 'NO'}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button color="success" onClick={() => row._id && handleEdit(row._id)} variant="contained">
                                                Edit
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PageContainer>
            }
        </>
    );
}

export default UserList;
