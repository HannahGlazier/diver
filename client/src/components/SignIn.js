

import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import SignUp from "./SignUp";

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, createTheme, ThemeProvider, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

    function Copyright() {
        return (
            <div className="github">
                <a href= "https://github.com/HannahGlazier" target="_blank" rel="noreferrer"><GitHubIcon/> Hannah Glazier </a>
            </div>
        );
    }

    const theme = createTheme();

    export default function SignIn({ setUser }) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true)
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
        }).then((r) => {
        // setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => setUser(user));
            history.push('/')
        } else {
            r.json().then(err => window.alert(err.errors))
        }
        });
    }


    return (
            <div>
            {showLogin ? (
            <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1592859632074-cf5cfb714552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant= "h2"> Diver </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value = {name}
                        onChange ={(e) => setName(e.target.value)}
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Button onClick={() => setShowLogin(false)}>
                            {"Don't have an account? Sign Up"}
                        </Button>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
                </Grid>
            </Grid>
            </ThemeProvider>
            ) : (
            <SignUp setUser={setUser} />
            )}
        </div>
    );
}





// import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
// import SignUp from './SignUp'


// function SignIn({ setUser }) {

//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showLogin, setShowLogin] = useState(true)

//     const history = useHistory();

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsLoading(true);
//         fetch("/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, password }),
//         }).then((r) => {
//         setIsLoading(false);
//         if (r.ok) {
//             r.json().then((user) => setUser(user));
//             history.push('/')
//         } else {
//             r.json().then(err => window.alert(err.errors))
//         }
//         });
//     }

//     return (
//         <>
//         {showLogin ? (
//         <form onSubmit={handleSubmit}>
//         <div>
//             <label htmlFor="name">Username</label>
//             <input
//             type="text"
//             id="name"
//             autoComplete="off"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             />
//         </div>
        
//             <label htmlFor="password">Password</label>
//             <input
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             />
        
    
//             <button variant="fill" color="primary" type="submit">
//             {isLoading ? "Loading..." : "Login"}
//             </button>
        
//         {/* <form>
//             {errors.map((err) => (
//             <error key={err}>{err}</error>
//             ))}
//         </form> */}
//         <button onClick={() => setShowLogin(false)}>Don't have an account? Sign Up</button>
//         </form>
//         ) : (
//         <SignUp setUser={setUser} />
//         )}
//         </>
//     );
// }

// export default SignIn;