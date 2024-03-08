import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField, Typography, TablePagination, IconButton, Stack, Button, useMediaQuery, Avatar, Card, CardContent } from '@mui/material';
import { BASE_URL, rows, tableHeadings } from '../configData';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import axios from 'axios';
import EditPopup from './EditPopup';

const UsersList = () => {
    const [rowData, setRowData] = useState(rows);
    const [editPopup,setEditPopup] = useState(false);
    const [editvalue,setEditValue] = useState({});
    const [editId,setEditId] = useState(0);

    const img = "blob:http://localhost:3000/47f0e1d1-e563-4307-8bdf-a881c0a65436"

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Users`);
            if (response.status === 200) {
                setRowData(response.data);
            } else {
                console.log("check res", response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    const downloadCSV = (data) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const headerRow = keys.join(',');
        const dataRow = values.join(',');
        const csvData = `${headerRow}\n${dataRow}`;
        const blob = new Blob([csvData], { type: 'text/csv' });
        const tempLink = document.createElement('a');

        tempLink.href = URL.createObjectURL(blob);
        tempLink.setAttribute('download', `${data.userName}.csv`);
        tempLink.click();
    };

    const downloadPDF = (data) => {
        const doc = new jsPDF();
        const dataString = JSON.stringify(data);
        doc.text(dataString, 10, 10);
        doc.save(`${data.userName}.pdf`);
    };

    const editData = async (id) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/Users/${id}`);
            if (response.status === 200) {
                fetchData()
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const openEdit =(row)=>{
        const {userName,address,dob,id} = row;
        const dobDate = row?.dob?.split('T')[0];
        let data = {
            userName,
            address,
            dob:dobDate
        }
        setEditValue(data)
        setEditId(id)
        setEditPopup(true)
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/Users/${id}`);
            if (response.status === 200) {
                fetchData()
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <>
        <EditPopup
            editDataValue={[editvalue,setEditValue]}
            editOpenModal={[editPopup,setEditPopup] }
            id={editId}
        />

            <Card elevation={3} sx={{ marginBottom: '1rem', width: '95%', margin: '0 auto', mt: 5 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Users List
                    </Typography>
                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {tableHeadings && tableHeadings.map((headingName, i) => (
                                        <TableCell key={i}>{headingName.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowData && rowData.map((row, i) => (
                                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="left">{i + 1}</TableCell>
                                        <TableCell align="left" sx={{ p: 0 }}>
                                            <Avatar
                                                sx={{
                                                    width: 55,
                                                    height: 55,
                                                }}
                                                src={img || ''}
                                            >
                                            </Avatar>
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.userName}</TableCell>
                                        {/* <TableCell align="left">{row.password}</TableCell> */}
                                        <TableCell align="left">{row.dob}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="left" sx={{ pl: 0 }}>
                                            <IconButton aria-label="delete" onClick={() => downloadCSV(row)} >
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => downloadPDF(row)} >
                                                < PictureAsPdfIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left" sx={{ pl: 0 }}>
                                            <IconButton aria-label="delete" onClick={() => openEdit(row)} >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleDelete(row.id)} >
                                                < DeleteIcon sx={{ color: 'red' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

        </>
    )
}

export default UsersList