import React, { useState, useEffect } from 'react';
import { deleteVillage, fetchAllVillages, Village } from '../api/fetch';
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type UserListPropsType = {
    data?: Village[];
    hideSearchResult?: () => void;
    title?: string;
};

const UserList: React.FC<UserListPropsType> = ({ data, hideSearchResult, title = 'User List' }) => {
    const [villages, setVillages] = useState<Village[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>('');

    const handleEdit = async (id: string, updatedData?: Village) => {
        if (updatedData) {
            // Update the state with the edited user details
            setVillages(prevVillages =>
                prevVillages.map(village => (village._id === id ? updatedData : village))
            );
        } else {
            // If updatedData is not provided, fetch all villages again
            const updatedVillages = await fetchAllVillages();
            setVillages(updatedVillages);
        }
    
        // Reset userId to return to the list view
        setUserId("");
    };

    const removeVillager = async(id: string) => {
        setLoading(true)
        try{
            await deleteVillage(id)
            fetchAllVillages()
            setLoading(false)
            alert("user deleted success")
        } catch(e){
            alert("Error deleting user")
            setLoading(false)
        }
       
    }

    useEffect(() => {
        if (data?.length) {
            setVillages(data);
            setLoading(false);
        } else {
            const getVillages = async () => {
                try {
                    const data = await fetchAllVillages();
                    setVillages(data);
                } catch (error) {
                    console.error('Failed to load villages');
                } finally {
                    setLoading(false);
                }
            };

             getVillages();
        }
    }, []);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('User List', 15, 10);
        autoTable(doc, {
            head: [['SL No.','Name', 'Amount', 'Mobile Number', 'Address', 'Payment Type', 'Payment Status', 'Sweet Received']],
            body: villages.map((row, index)=>{
            
                return (
                [   index + 1 ,
                    row.name,
                    row.amount || 'NA',
                    row.mobileNumber || 'NA',
                    row.address,
                    row.paymentStatus === 'completed' ? row.paymentType : 'NA',
                    row.paymentStatus === 'completed' ? 'Completed' : 'Pending',
                    row.sweetGiven ? 'YES' : 'NO',
                ]
                )
            })
        });
        doc.save('User_List.pdf');
    };

    if (data?.length === 0) {
        return <></>;
    }

    if (loading) {
        return (
            <PageContainer title="User List">
                <Grid justifyContent={'center'}>
                    <Loader />
                </Grid>
            </PageContainer>
        );
    }

    return (
        <>
            {userId ? (
                <EditUser id={userId} handleEdit={handleEdit} hideSearchResult={hideSearchResult} />
            ) : (
                <PageContainer title={title}>
                    {/* Download PDF Button */}
                    <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                        <Button variant="outlined" color="success" onClick={handleDownloadPDF}>
                        <CloudDownloadIcon sx={{marginRight: "4px"}}/>{" "} Download PDF
                        </Button>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>SL No.</StyledTableCell>
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
                                {villages.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.amount || 'NA'}</StyledTableCell>
                                        <StyledTableCell align="center">{row.mobileNumber || 'NA'}</StyledTableCell>
                                        <StyledTableCell align="center">{row.address}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.paymentStatus === 'completed' ? row.paymentType : 'NA'}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.paymentStatus === 'completed' ? (
                                                <Chip label="Completed" color="success" size="small" />
                                            ) : (
                                                <Chip label="Pending" color="warning" size="small" />
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.sweetGiven ? 'YES' : 'NO'}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button sx={{marginBottom: "4px"}} color="success" onClick={() => row._id && setUserId(row._id)} variant="outlined">
                                            <ModeIcon/>
                                            </Button>
                                            <Button color="success" onClick={() => row._id && removeVillager(row._id)} variant="outlined">
                                            <DeleteIcon/>
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PageContainer>
            )}
        </>
    );
};

export default UserList;

