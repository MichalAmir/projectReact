import React, { useRef } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import ImageSlider from './ImageSlider'; // מייבא את הקומפוננטה של הסליידר
import './login.css';

export function LoginForm() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate(); 

    async function post() {
        try {
            const nameValue = nameRef.current.value;
            const passwordValue = passwordRef.current.value;

            if (nameValue === "admin" && passwordValue === "123456") {
                navigate("/manager");
            } else {
                console.log('Please enter both username and password');
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    // מוסיף את התמונה של הסליידר בתוך הקומפוננטה של LoginForm
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
            </Box>
        </Box>    
    );
}







