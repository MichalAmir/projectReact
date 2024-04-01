import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import singleton from "./Classes/MeetingObject";
import { TextField, Button, Card, CardContent, FormControl, Typography, Divider, Select, MenuItem, Grid, Box } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';

export const Appointments = observer(() => {
    const [time, setTime] = useState(dayjs());
    const [meeting, setMeeting] = useState({
        id: "",
        serviceType: "",
        location: "",
        dateTime: "",
        clientName: "",
        clientLastName: "",
        clientPhone: "",
        clientEmail: "",
    });


    const initMeeting = (field, value) => {
        let tmpMeeting = { ...meeting };
        tmpMeeting[field] = value;
        setMeeting(tmpMeeting);
    }

    const handleAddAppointment = async (e) => {
        e.preventDefault();
        meeting['dateTime'] = time.format();
        try {
            await singleton.addMeeting({ ...meeting, dateTime: time.format() });
            await singleton.initList(); // קריאה לפונקציה initList לאחר הוספת הפגישה
            console.log("Meeting added successfully!");



        } catch (error) {
            console.error("Error adding meeting:", error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Card variant="outlined" sx={{ margin: 22, marginTop: 2, border: "2px solid #eee", borderRadius: "10px", padding: "20px", maxWidth: "400px" }}>
                <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <InfoOutlined sx={{ mr: 1 }} />
                    Add new meeting
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <CardContent>
                    <form onSubmit={handleAddAppointment}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="text"
                                        placeholder="Enter ID"
                                        onBlur={(e) => initMeeting('id', e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="text"
                                        placeholder="Enter Name"
                                        onBlur={(e) => initMeeting('clientName', e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="text"
                                        placeholder="Enter Last Name"
                                        onBlur={(e) => initMeeting('clientLastName', e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="tel"
                                        placeholder="Enter Phone"
                                        onBlur={(e) => initMeeting('clientPhone', e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Select
                                        value={meeting.serviceType}
                                        onChange={(e) => initMeeting('serviceType', e.target.value)}
                                    >
                                        <MenuItem value={"Hotel"}>Hotel</MenuItem>
                                        <MenuItem value={"Villa"}>Villa</MenuItem>
                                        <MenuItem value={"Zimmer"}>Zimmer</MenuItem>
                                        <MenuItem value={"Penthouse"}>Penthouse</MenuItem>
                                        <MenuItem value={"Pool"}>Pool</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Select
                                        value={meeting.location}
                                        onChange={(e) => initMeeting('location', e.target.value)}
                                    >
                                        <MenuItem value={"North"}>North</MenuItem>
                                        <MenuItem value={"South"}>South</MenuItem>
                                        <MenuItem value={"Center"}>Center</MenuItem>
                                        <MenuItem value={"humiliation"}>humiliation</MenuItem>
                                        <MenuItem value={"Upper Galilee"}>Upper Galilee</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={100} sm={60}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <FormControl fullWidth>
                                        <DateTimePicker
                                            value={time}
                                            onChange={(newValue) => setTime(newValue)}
                                        />
                                    </FormControl>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={100} sm={60}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="email"
                                        placeholder="Enter Email"
                                        onBlur={(e) => initMeeting('clientEmail', e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <EmailIcon style={{ color: "gray" }} />
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" fullWidth style={{ backgroundColor: '#FFC0CB', color: 'black', border: 'none', width: '50%', marginLeft: '90px', padding: '9px' }}>
                                    Add Meeting
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px', marginRight: '220px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px', fontFamily: 'Calibri', size: '50px' }}>
                    Convening a Meeting
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', fontFamily: 'Calibri' }}>
                    Here you can make an appointment for a meeting at the place where you want to rent
                    <br />
                    your event, whether it's a vacation, party, bar mitzvah, bat mitzvah, birthdays, team events and more...
                    <br />
                    You can leave your details here and we will get back to you as soon as possible.
                    <br /><br />
                    To call a meeting, you must mainly enter your ID number and the place you want to rent, phone and email.
                    <br /><br />
                    *To cancel the appointment, please notify 24 hours in advance.
                    <br /><br />
                    See you soon!
                </Typography>
            </Box>
        </Box>
    );
});



