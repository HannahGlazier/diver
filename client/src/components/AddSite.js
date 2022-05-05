import React, { useState } from 'react'
import {  useHistory } from "react-router-dom";
import AddDiveLog from './AddDiveLog'
import Profile from './Profile'

import GitHubIcon from '@mui/icons-material/GitHub';
import { blue } from '@mui/material/colors';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider, MenuItem, Select, InputLabel } from "@mui/material";


function AddSite({ addNewLog, user, setUser, addNewSite, sites }) {

    const initialSiteForm = {
        name: "",
        location: "",
        lat: "", 
        long: ""
    }

    const [siteForm, setSiteForm] = useState(initialSiteForm)
    const [siteState, setSiteState] = useState(null)

    const theme = createTheme();
    let history = useHistory();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSiteForm(siteForm => ({...siteForm, [name]: value}))
    }

    function handleSubmit(e) {
        e.stopPropagation()
        e.preventDefault()

        const newSite = {
            name: siteForm.name,
            location: siteForm.location, 
            lat: siteForm.lat, 
            long: siteForm.long
        }

        fetch("/sites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(newSite)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((site => addNewSite(site)))
                .then(setSiteForm(initialSiteForm))
            } else {
                r.json().then(err => window.alert(err.errors))
            }
        })
    }



    function goToAddLog(e){
        e.stopPropagation()
        e.preventDefault()
        history.push('/addLog')
    }

    return (
        <div>
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
                    <Avatar sx={{  width: 80, height: 80, bgcolor: blue[100] }} aria-label="Scuba Mask icon by Icons8" src={"https://img.icons8.com/color/96/000000/scuba-mask.png"}>
                    </Avatar>
                <Typography component="h1" variant="h5">
                    Add New Dive Site
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            label="Name"
                            name="name"
                            value={siteForm.name}
                            onChange={handleChange}
                            placeholder="Dive Site Name"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        type="text"
                        label="Location"
                        name="location"
                        value={siteForm.location}
                        onChange={handleChange}
                        placeholder="Location"

                        />
                    </Grid>
    

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Latitude</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        type="text"
                        label="Lat"
                        name="lat"
                        value={siteForm.lat}
                        onChange={handleChange}
                        placeholder="Latitude"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Longitude</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        type="text"
                        label="Long"
                        name="long"
                        value={siteForm.long}
                        onChange={handleChange}
                        placeholder="Longitude"
                        />
                    </Grid>

                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add Site
                    </Button>

                    <Button onClick={(e) => goToAddLog(e)}>
                        Return to Add Dive Log
                    </Button>
                </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
            </ThemeProvider>
            {/* <AddDiveLog
                addNewLog={addNewLog}
                user={user}
                setUser={setUser}
                siteState={siteState}
                sites={sites}
            /> */}
        </div>
    )
}

export default AddSite
