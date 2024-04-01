import React, { useRef, useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import ImageSlider from './ImageSlider'; 
import './login.css';

export function LoginForm() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState(""); 

    async function post() {
        try {
            const nameValue = nameRef.current.value;
            const passwordValue = passwordRef.current.value;

            if (nameValue === "admin" && passwordValue === "123456") {
                navigate("/manager");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Box >
            <ImageSlider />
            <Box id="boxLog" 
                component="form"
                sx={{'& > :not(style)': { m: 1.5, width: '22ch' }}}
                textAlign="center"
            >
                <p id="logAdmin">Log in</p>
                <TextField type="text" inputRef={nameRef} id="outlined-basic1" label="Username" variant="outlined" />
                <br />
                <TextField type="password" inputRef={passwordRef} id="outlined-basic2" label="Password" variant="outlined" />
                <Stack spacing={2} direction="row" color="warning"></Stack>
                <Button onClick={post} variant="outlined">Login</Button>
                {error && 
                    <Box className="error-box">
                        <Alert severity="error">{error}</Alert>
                    </Box>
                }
            </Box>
        </Box>    
    );
}


