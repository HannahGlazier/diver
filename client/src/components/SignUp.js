
import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import SignIn from "./SignIn";

//MUI Imports
import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider, MenuItem, Select, InputLabel} from "@mui/material";

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
            window.location.reload(true);
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

                {/* <Grid item xs={12}>
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
                </Grid> */}

                <Grid item md={12}>
                <InputLabel id="demo-simple-select-standard-label">Select Certification Level</InputLabel>
                <br></br>
                    <Select 
                        fullWidth
                        labelId= "demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name = "certification_level"
                        value = {certification_level}
                        onChange={(e) => setCertificationLevel(e.target.value)}
                        label = "Certification Level"
                    >
                            <MenuItem>Select Certification Level</MenuItem>
                            <MenuItem value="Open Water Diver">Open Water Diver</MenuItem>
                            <MenuItem value="Advanced Open Water Diver">Advanced Open Water Diver</MenuItem>
                            <MenuItem value="Rescue Diver">Rescue Diver</MenuItem>
                            <MenuItem value="Enriched Air (Nitrox) Diver">Enriched Air (Nitrox) Diver</MenuItem>
                            <MenuItem value="Deep Diver">Deep Diver</MenuItem>
                            <MenuItem value="Master Diver">Master Diver</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">Certification Date</InputLabel>
                <br></br>
                    <TextField
                    required
                    fullWidth
                    name="certification_date"
                    type="date"
                    id="certification_date"
                    value = {certification_date}
                    onChange = {(e) => setCertificationDate(e.target.value)}
                    autoComplete="certification_date"
                    />
                </Grid>


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
                        fullWidth
                        labelId= "demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name = "icon"
                        value = {icon}
                        onChange={(e) => setIcon(e.target.value)}
                        label = "Select Icon"
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
