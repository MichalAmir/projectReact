 import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import businessDataObject from './Classes/BusinessObject';
import '../src/Card.css';

export function BusinessDataClients() {
    const [businessDetails, setBusinessDetails] = useState();
    useEffect(() => {
        async function fetchBusinessDetails() {
            try {
                const data = await businessDataObject.getLast();
                if (data) {
                    setBusinessDetails(data);
                } else {
                    console.error("No data fetched from server.");
                }
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        }

        fetchBusinessDetails();
    }, []);

    return (
        <>
            {businessDetails && (
                <CustomCard
                    logoSrc={businessDetails.logo}
                    username={businessDetails.owner}
                    businessDetails={businessDetails}
                />
            )}
        </>
    )
}

function CustomCard({ logoSrc, username, businessDetails }) {
    const [selectedButton, setSelectedButton] = useState(false);
    const navigate = useNavigate()

   

    const handleLoginButtonClick = () => {

        setSelectedButton(!selectedButton);
    };

    return (<>
        <Card className="card">

            <CardContent className="card-content">
                <div className="business-details">
                    <div className="detail">
                        <Button variant="text" style={{ marginLeft: '5px', color: "black", fontSize: '15px', fontFamily: '-moz-initial' }} onClick={handleLoginButtonClick}>LogIn</Button>
                        <ArrowCircleRightIcon />
                    </div>

                    <div className="detail">
                        <LocationOnIcon />
                        <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.address}</Typography>
                    </div>

                    <div className="detail">
                        <LocalPhoneIcon />
                        <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.phone}</Typography>
                    </div>

                    <div className="detail">
                        <ManageAccountsIcon />
                        <Typography variant="body2" style={{ marginLeft: '5px', fontSize: '17px', fontFamily: '-moz-initial' }}>{businessDetails.owner}</Typography>
                    </div>
                </div>
            </CardContent>
            <div className="logo-section">
                <CardMedia
                    component="img"
                    image={logoSrc} 
                    alt="Store Logo"
                    className="card-logo"
                />

            </div>
        </Card>
       {selectedButton && navigate("/login")}
    </>
    );
}
