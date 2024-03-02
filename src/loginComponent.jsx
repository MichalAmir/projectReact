import { useRef } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LoginForm() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const url = "http://localhost:8787";

    async function post() {
        try {
            const nameValue = nameRef.current.value;
            const passwordValue = passwordRef.current.value;

            if (nameValue && passwordValue) {
                const res = await fetch(url + "/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: nameValue, password: passwordValue })
                });
                const data = await res.json();
                console.log(data); // עשה משהו עם הנתונים שהתקבלו מהשרת
            } else {
                console.log('Please enter both username and password');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box
            // display="flex"
            // flexDirection="column"
            // justifyContent="center"
            // alignItems="center"
            // height="50vh" // גובה מלא של המסך
        >
            <Box id="boxLog"
                component="form"
                sx={{'& > :not(style)': { m: 1.5, width: '22ch' }}}
                textAlign="center" //כפתור login על מנת שיהיה באמצע

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
