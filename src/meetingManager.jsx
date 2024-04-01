import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Add, CalendarMonth } from "@mui/icons-material"; // משנה את Add ל-CalendarMonth
import singleton from "./Classes/MeetingObject";

export const AdminPage = observer(() => {
    const [meetings, setMeetings] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        singleton.initList();
    }, []);

    useEffect(() => {
        setMeetings(singleton.getList);
    }, [singleton.getList]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button variant="contained" onClick={handleOpenDialog} 
            style={{margin: 'auto',backgroundColor: '#FFC0CB',color: 'black', border: 'none', width: '20%', padding: '10px',}}>
                Open Meeting Table
                <CalendarMonth style={{ marginLeft: '5px' }} /> {/* הוספת האייקון עם margin-left */}
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Meeting Table</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>LastName</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>DateTime</TableCell>
                                    <TableCell>location</TableCell>
                                    <TableCell>type</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetings.map((meeting, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{meeting.id}</TableCell>
                                        <TableCell>{meeting.clientName}</TableCell>
                                        <TableCell>{meeting.clientLastName}</TableCell>
                                        <TableCell>{meeting.clientPhone}</TableCell>
                                        <TableCell>{meeting.dateTime}</TableCell>
                                        <TableCell>{meeting.location}</TableCell>
                                        <TableCell>{meeting.serviceType}</TableCell>
                                        <TableCell>{meeting.clientEmail}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default AdminPage; 

