
import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import SignIn from "./SignIn";

//MUI Imports
import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider, MenuItem, Select, InputLabel} from "@mui/material";
// import CalendarPicker from '@mui/x-date-pickers/CalendarPicker';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker
// } from '@material-ui/pickers';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import { alpha } from '@material-ui/core/styles' 

    function Copyright() {
    return (
        <div id="github">
        <a href= "https://github.com/HannahGlazier" target="_blank" rel="noreferrer"><GitHubIcon/> Hannah Glazier </a>
        </div>
    );
    }
    const theme = createTheme();

    export default function SignUp( {setUser}) {
    const [showLogin, setShowLogin] = useState(true)
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [certification_level, setCertificationLevel] = useState("");
    const [certification_date, setCertificationDate] = useState("");
    const [homebase, setHomebase] = useState("");
    const [icon, setIcon] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            password,
            password_confirmation: passwordConfirmation,
            certification_level,
            certification_date,
            homebase, 
            icon
        }),
        }).then((r) => {
        setIsLoading(false);
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Enter Name</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    autoComplete="name"
                    />
                </Grid>
                
                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Create Password</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    />
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Confirm Password</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    id="password_confirmation"
                    value = {passwordConfirmation}
                    onChange = {(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="password-confirmation"
                    />
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Certification Level</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="certification_level"
                    label="Certification Level"
                    type="certification_level"
                    id="certification_level"
                    value = {certification_level}
                    onChange = {(e) => setCertificationLevel(e.target.value)}
                    autoComplete="certification_level"
                    />
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Certification Date</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="certification_date"
                    // label="Certification Date"
                    type="date"
                    id="certification_date"
                    value = {certification_date}
                    onChange = {(e) => setCertificationDate(e.target.value)}
                    autoComplete="certification_date"
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                    label="Material Date Picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    />

                    </MuiPickersUtilsProvider>
                </Grid> */}

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Homebase</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="homebase"
                    label="Homebase"
                    type="homebase"
                    id="homebase"
                    value = {homebase}
                    onChange = {(e) => setHomebase(e.target.value)}
                    autoComplete="homebase"
                    />
                </Grid>

                <Grid item md={12}>
                <InputLabel id="demo-simple-select-standard-label">Select User Icon</InputLabel>
                <br></br>
                    <Select 
                        labelId= "demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name = "icon"
                        value = {icon}
                        onChange={(e) => setIcon(e.target.value)}
                        label = "Location_Id"
                    >
                            <MenuItem>Select Icon</MenuItem>
                            <MenuItem value="https://img.icons8.com/color/96/000000/clown-fish.png">Clown Fish</MenuItem>
                            <MenuItem value="https://img.icons8.com/color/96/000000/fish.png">Angel Fish</MenuItem>
                            <MenuItem value="https://img.icons8.com/color/96/000000/big-eats-small.png">Big + Small Fish</MenuItem>
                            <MenuItem value="https://img.icons8.com/emoji/96/000000/blow-fish.png">Puffer Fish</MenuItem>
                            <MenuItem value="https://img.icons8.com/fluency/96/000000/perch.png">Perch</MenuItem>
                    </Select>
                </Grid>

                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button onClick={() => setShowLogin(false)}>
                    Already have an account? Sign in
                    </Button>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
        ) : (
            <SignIn />
        )}
        </div>
    );
}


// import React, { useState } from "react";
// import SignIn from "./SignIn";


// function SignUp({ onLogin, onSignIn, setUser }) {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordConfirmation, setPasswordConfirmation] = useState("");
//     const [certification_level, setCertificationLevel] = useState("");
//     const [certification_date, setCertificationDate] = useState("");
//     const [homebase, setHomebase] = useState("");
//     const [icon, setIcon] = useState("");
//     const [errors, setErrors] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showLogin, setShowLogin] = useState(true)

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setErrors([]);
    //     setIsLoading(true);
    //     fetch("/signup", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         name,
    //         password,
    //         password_confirmation: passwordConfirmation,
    //         certification_level,
    //         certification_date,
    //         homebase, 
    //         icon
    //     }),
    //     }).then((r) => {
    //     setIsLoading(false);
    //     if (r.ok) {
    //         r.json().then((user) => setUser(user));
    //     } else {
    //         r.json().then(err => window.alert(err.errors))
    //     }
    //     });
    // }

//     return (
//         <>
//         { showLogin ? (
//         <form 
//         className="signup"
//         onSubmit={handleSubmit}
//         >
    
//             <label htmlFor="name">Name</label>
//             <input
//             type="text"
//             id="name"
//             autoComplete="off"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             />
        
//             <br></br>
//             <label htmlFor="password">Password</label>
//             <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             />
        
//             <br></br>
//             <label htmlFor="password">Password Confirmation</label>
//             <input
//             type="password"
//             id="password_confirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             autoComplete="current-password"
//             />
//             <br></br>

//             <label htmlFor="icon">Choose an Icon: </label>
//             <select 
//                 id="icon"
//                 name="icon"
//                 value={icon}
//                 onChange={(e) => setIcon(e.target.value)}
//             >
//                 <option value="">Select Icon</option>
//                 <option value="https://img.icons8.com/color/96/000000/clown-fish.png">Clown Fish</option>
//                 <option value="https://img.icons8.com/color/96/000000/fish.png">Angel Fish</option>
//                 <option value="https://img.icons8.com/color/96/000000/big-eats-small.png">Big eats small fish</option>
//                 <option value="https://img.icons8.com/emoji/96/000000/blow-fish.png">Blow Fish</option>
//                 <option value="https://img.icons8.com/fluency/96/000000/perch.png">Perch</option>
//             </select> 
        
        
//             <br></br>
//             <label htmlFor="certification_level">Certification Level</label>
//             <input
//             type="text"
//             id="certification_level"
//             value={certification_level}
//             onChange={(e) => setCertificationLevel(e.target.value)}
//             />
        
//             <br></br>
//             <label htmlFor="certification_date">Certification Date</label>
//             <input
//             type="date"
//             label="date"
//             // id="certificationDate"
//             value={certification_date}
//             onChange={(e) => setCertificationDate(e.target.value)}
//             ></input>

//             <br></br>
//             <label htmlFor="homebase">Homebase</label>
//             <input
//             type="text"
//             id="homebase"
//             label="homebase"
//             value={homebase}
//             onChange={(e) => setHomebase(e.target.value)}
//             ></input>
        
//             <br></br>
//             <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
//             <button onClick={() => setShowLogin(false)}>Take me back</button>
    
//             {/* {errors.map((err) => (
//             <Error key={err}>{err}</Error> */}
//             {/* ))} */}
        
//         </form>
//         ) : (
//             <SignIn setUser={setUser}/>
//         )}
//         </>
//     );
//     }

// export default SignUp;