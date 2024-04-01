import { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import ServiceStore from "./Classes/ServiceObject";
import Swal from 'sweetalert2';

export function Services() {
    const [service, setService] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        duration: 0,
        img: "",
    });

    const lengthBefore = ServiceStore.Servieslist.length;

    function initService(field, value) {
        let tmpService = { ...service };
        tmpService[field] = value;
        setService(tmpService);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const img = URL.createObjectURL(file);
        setService({ ...service, img });
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        await ServiceStore.addServies({ ...service, id: service.id, img: service.img  });        
        if (ServiceStore.Servieslist.length === lengthBefore + 1) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Service added successfully!",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add the service. Please try again.",
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ maxWidth: 500, margin: 15, padding: 3, border: 1, borderColor: 'grey.400', borderRadius: 2, marginTop: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Add New Service
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        placeholder="Enter Service ID"
                        onBlur={(e) => initService('id', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        placeholder="Enter Service Name"
                        onBlur={(e) => initService('name', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        placeholder="Enter Service Description"
                        onBlur={(e) => initService('description', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        placeholder="Enter Service Price"
                        onBlur={(e) => initService('price', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        placeholder="Enter Service Duration"
                        onBlur={(e) => initService('duration', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="url"
                        placeholder="Enter Image URL"
                        onBlur={(e) => initService('img', e.target.value)}
                        fullWidth
                    />
                </Grid>
                {service.img && (
                    <Grid item xs={12}>
                        <img src={service.img} alt="Selected Image" style={{ maxWidth: '100%', marginTop: 10 }} />
                    </Grid>
                )}
            </Grid>
            <Button
                variant="contained" type="submit" fullWidth style={{ backgroundColor: '#FFC0CB', color: 'black', border: 'none', width: '50%', marginLeft: '90px', padding: '9px' }}
                onClick={handleAddService}
                startIcon={<AddCircle />}
                sx={{ mt: 2, width: '100%' }}
            >
                Add Service
            </Button>
        </Box>
        <Box sx={{ marginTop: '20px', marginLeft: '20px', marginRight: '220px'  }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px', fontFamily: 'Calibri', size: '50px' }}>
                New Service
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', fontFamily: 'Calibri' }}>
            We are already waiting for a new service that customers can enjoy and pamper themselves in a new place
                   <br />
                   For their event, whether it's a vacation, party, bar mitzvah, bat mitzvah, birthdays team events and more...
                   <br />
                  We would love to have something new on the agenda...
                   <br /><br />
                   To add the new service you must include the ID and name of the service and the description of the service and add a photo in order to market the place in a good and quality way
                   <br /><br />
                   *Note that the details have been successfully entered.
                   <br /><br />
                   We are already waiting to host you in the new place!
            </Typography>
        </Box>
    </Box>
    
        
    );
}
