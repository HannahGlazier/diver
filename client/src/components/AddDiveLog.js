import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddSite from './AddSite'
import Profile from './Profile'

import SignaturePad from 'react-signature-canvas'
import Popup from 'reactjs-popup'

import GitHubIcon from '@mui/icons-material/GitHub';
import { blue, orange } from '@mui/material/colors';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider, MenuItem, Select, InputLabel, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl } from "@mui/material";



function Copyright() {
    return (
        <div className="center">
        <a href= "https://github.com/HannahGlazier" target="_blank" rel="noreferrer"><GitHubIcon/> Hannah Glazier </a>
        </div>
    );
    }

function AddDiveLog({ addNewLog, user, setUser, siteState, sites, logs, setLogs, theme }) {
    // const [site, setSite] = useState([])
    const [site, setSite] = useState([])

    const initialLogForm = { 
        notes: "",
        depth: "",
        bottom_temp: "",
        suit_thickness: "",
        weight: "",
        time_in: "",
        time_out: "",
        boat: true,
        fresh: false,
        date: "", 
        divemaster: "",
        dive_budy: "",
        signature: "",
        user_id: user.id,
        site_id: "" 
    }
    
    const [signatureState, setSignatureState] = useState("")
    const [logForm, setLogForm] = useState(initialLogForm)
    

    let history = useHistory();

    // Handle Rendering Site Option List
    useEffect(() => {
        fetch("/sites")
        .then((response) => response.json())
        .then(site => setSite(site));
        }, []);


    const siteMap = site.map(s => (
        <MenuItem
            key={s.id}
            value={s.id}
        >{s.name} - {s.location}</MenuItem>
    ))

    // Begin Dive Log Form Handlers

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogForm(logForm => ({...logForm, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation()

        const newLog = {
        notes: logForm.notes,
        depth: logForm.depth,
        bottom_temp: logForm.bottom_temp,
        suit_thickness: logForm.suit_thickness,
        weight: logForm.weight,
        time_in: logForm.time_in,
        time_out: logForm.time_out,
        boat: logForm.boat,
        fresh: logForm.fresh,
        date: logForm.date, 
        divemaster: logForm.divemaster,
        dive_budy: logForm.dive_budy,
        signature: signatureState,
        user_id: user.id,
        site_id: logForm.site_id
        }

        fetch("/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLog)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(setLogForm(initialLogForm))
                .then(newLog => setLogs([...logs, newLog]))
                history.push('/')
            } else {
                r.json().then(err => window.alert(err.errors))
            }
        })
    }

    // Signature handlers
    let sigPad = useRef({})
    let data = ''

    function clear(e){
        e.stopPropagation()
        e.preventDefault()
        sigPad.current.clear();
    }

    function save(e){
        e.stopPropagation()
        e.preventDefault()
        data = sigPad.current.toDataURL()
        setSignatureState(data)
    }

    // END Signature handlers


function goToAddSite(e){
    e.stopPropagation()
    e.preventDefault()
    history.push('/addSite')
}

function returnHome(e){
    e.stopPropagation()
    e.preventDefault()
    history.push('/')
}

    return (
        <div className="spacing">
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
                    <Avatar sx={{  width: 80, height: 80, bgcolor: blue[100] }} aria-label="Scuba Tank icon by Icons8" src={"https://img.icons8.com/fluency/96/000000/scuba-tank.png"}>
                    </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Dive Log
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Select Dive Site</InputLabel>
                    <br></br>
                    <Select 
                            required
                            fullWidth
                            labelId= "demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name = "site_id"
                            value={logForm.site_id}
                            onChange={handleChange}
                            label = "site_id"
                        >
                                <MenuItem>Select Dive Site</MenuItem>
                                {siteMap}
                        </Select>
                    </Grid>
                    
                    
                    {/* <p>Dont see the site you're looking for? </p> */}
                    <div className="spacing">
                    <InputLabel id="demo-simple-select-standard-label">Dont see the site you're looking for?</InputLabel>
                    </div>

                    <Button className="spacing" variant="text" onClick={e =>  goToAddSite(e)}>Add new dive site</Button>
                    
                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Depth</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        name="depth"
                        label="Depth"
                        type="number"
                        id="password"
                        value={logForm.depth}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Suit Thickness(mm)</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        name="suit_thickness"
                        label="Suit Thickness"
                        type="number"
                        id="suit_thickness"
                        value={logForm.suit_thickness}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Bottom Temp</InputLabel>
                    <br></br>
                        <TextField
                        required
                        fullWidth
                        name="bottom_temp"
                        label="Bottom Temp"
                        type="number"
                        id="bottom_temp"
                        value={logForm.bottom_temp}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Weight(lbs)</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            name="weight"
                            label="Weight"
                            type="number"
                            id="weight"
                            value={logForm.weight}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Dive Master</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            name="divemaster"
                            label="Dive Master"
                            type="text"
                            id="divemaster"
                            value={logForm.divemaster}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Dive Buddy</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            label="Dive Buddy"
                            name="dive_budy"
                            value={logForm.dive_budy}
                            onChange={handleChange}
                            placeholder="Dive Buddy"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Time In</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="time"
                            name="time_in"
                            value={logForm.time_in}
                            onChange={handleChange}
                            placeholder="Time In"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Time Out</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="time"
                            name="time_out"
                            value={logForm.time_out}
                            onChange={handleChange}
                            placeholder="Time Out"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="date"
                            name="date"
                            value={logForm.date}
                            onChange={handleChange}
                            placeholder="Date"
                        />
                    </Grid>

                    <Grid className="spacing">
                    <InputLabel id="demo-simple-select-standard-label">Select Water Type</InputLabel>
                    <br></br>
                    <Select 
                        fullWidth
                        labelId= "demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name = "fresh"
                        value={logForm.fresh}
                        onChange={handleChange}
                        label = "fresh"
                    >
                            <MenuItem value="false">Salt Water</MenuItem>
                            <MenuItem value="true">Fresh Water</MenuItem>
                    </Select>
                    </Grid>

                    <Grid className="spacing">
                    <InputLabel id="demo-simple-select-standard-label">Select Dive Type</InputLabel>
                    <br></br>
                    <Select 
                        fullWidth
                        labelId= "demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name = "boat"
                        value={logForm.boat}
                        onChange={handleChange}
                        label = "boat"
                    >
                            <MenuItem value="true">Boat Dive</MenuItem>
                            <MenuItem value="false">Shore Dive</MenuItem>
                    </Select>
                    </Grid>


                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Dive Notes: </InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            multiline
                            id="outlined-multiline-flexible"
                            type="text"
                            label="notes"
                            name="notes"
                            value={logForm.notes}
                            onChange={handleChange}
                            placeholder="Dive Notes"
                        />
                    </Grid>

                <Grid className="spacing">

                <InputLabel  id="demo-simple-select-standard-label">Divemaster or Buddy Signature: </InputLabel>
                <br></br>
                    <SignaturePad
                    ref = {sigPad}
                    canvasProps={{
                        className: 'signature'
                    }}
                    />
                <Button variant="text" onClick={e => save(e)}>Save</Button>
                <Button variant="text" onClick={e => clear(e)}>Clear</Button>  
                </Grid>
                
                <input 
                    className="hidden"
                    type="text"
                    label="signature"
                    name="signature"
                    value={signatureState}
                    onChange={handleChange}
                    placeholder="Signature"
                ></input> 


                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add Log
                    </Button>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            </ThemeProvider>
        
        </div>
    )
}

export default AddDiveLog
