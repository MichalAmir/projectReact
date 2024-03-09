import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import businessObject from './Classes/BusinessObject'; // שינוי שם המשתנה מ-businessDataObject ל-businessObject
import { TextField } from '@mui/material';
import './Card.css';
import 'sweetalert2/dist/sweetalert2.css';

import { useNavigate } from 'react-router-dom';

export default function BusinessDetailsManagerPage() {
    const [businessDetails, setBusinessDetails] = useState({});
   
    useEffect(() => {
        async function fetchBusinessDetails() {
            try {
                const data = await businessObject.getLast(); // שינוי הקריאה לפונקציה getLast ממשתנה שמתאים לשם הנכון
                setBusinessDetails(data);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        }

        fetchBusinessDetails();
    }, []);

    return (
        <>
            <CustomCard
                logoSrc={businessDetails.logo}
                username={businessDetails.owner}
                businessDetails={businessDetails}
                setBusinessDetails={setBusinessDetails}
            />
        </>
    )
}

function CustomCard({ logoSrc, username, businessDetails, setBusinessDetails }) {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate()

    function handleClickEdit() {
        setEditMode(true);
    }

    function handleBlur(event) {
        const { name, value } = event.target;
        setBusinessDetails({ ...businessDetails, [name]: value });
    }

    async function handleSave() {
        await businessObject.addBusinessData(businessDetails); // שינוי הקריאה לפונקציה addBusinessData ממשתנה שמתאים לשם הנכון
        setEditMode(false);
    }

    return (<>
        {editMode ? (
            <form>
                <Card className="card">
                    <CardContent className="card-content">
                        <div className="business-details">
                            <div className="row">
                                <div className="detailtop">
                                    <TextField label="ID" name="id" variant="standard" defaultValue={businessDetails.id} onBlur={handleBlur} />
                                </div>
                                <div className='detailtop'>
                                    <TextField label="email" name="email" variant="standard" defaultValue={businessDetails.email} onBlur={handleBlur} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="detailtop">
                                    <TextField label="address" name="address" variant="standard" defaultValue={businessDetails.address} onBlur={handleBlur} />
                                </div>
                                <div className="detail">
                                    <TextField label="phone" name="phone" variant="standard" defaultValue={businessDetails.phone} onBlur={handleBlur} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="detailtop">
                                    <TextField label="owner name" name="owner" variant="standard" defaultValue={businessDetails.owner} onBlur={handleBlur} />
                                </div>
                                <div className='detail'>
                                    <TextField label="logo path" name="logo" variant="standard" defaultValue={businessDetails.logo} onBlur={handleBlur} />
                                </div>
                            </div>
                            <div className='detail'>
                                    <Button variant="outlined" onClick={handleSave} style={{ backgroundColor: '#FFC0CB', color: 'black', border: 'none' }}>Save</Button>
                                </div>
                        </div>
                    </CardContent>
                    <div className="logo-section">
                        <CardMedia
                            component="img"
                            image={logoSrc} // Make sure this points to the correct image file
                            alt="Store Logo"
                            className='card-logo'
                        />
                    </div>
                </Card>
            </form>
        ) :
            (
                <Card className="card">
                    <CardContent className="card-content">
                        <div className="business-details">
                            <div className="detail">
                                <EditIcon style={{ color: "black" }} onClick={handleClickEdit} />
                            </div>
                            
                            <div className="detail">
                                <AccountCircleIcon style={{ color: "black"  }} />
                                <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.owner}</Typography>
                            </div> 
                            
                            <div className="detail">
                                <EmailIcon style={{ color: "black"  }} />
                                <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.email}</Typography>
                            </div>

                            <div className="detail">
                                <LocationOnIcon style={{ color: "black"  }} />
                                <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.address}</Typography>
                            </div>

                            <div className="detail">
                                <LocalPhoneIcon style={{ color: "black"  }} />
                                <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.phone}</Typography>
                            </div>

                        </div>
                    </CardContent>
                    <div className="logo-section">
                        <CardMedia
                            component="img"
                            image={logoSrc} // Make sure this points to the correct image file
                            alt="Store Logo"
                            className="card-logo"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </Card>
            )
        }
    </>
    );
}












