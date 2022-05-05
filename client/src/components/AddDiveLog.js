import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddSite from './AddSite'
import Profile from './Profile'

import SignaturePad from 'react-signature-canvas'
import Popup from 'reactjs-popup'

import GitHubIcon from '@mui/icons-material/GitHub';
import { blue } from '@mui/material/colors';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider, MenuItem, Select, InputLabel } from "@mui/material";


function Copyright() {
    return (
        <div id="github">
        <a href= "https://github.com/HannahGlazier" target="_blank" rel="noreferrer"><GitHubIcon/> Hannah Glazier </a>
        </div>
    );
    }
    const theme = createTheme();

function AddDiveLog({ addNewLog, user, setUser, siteState, sites, logs, setLogs }) {
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
        site_id: site.id 
        // maybe dont need site id?
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

    // function handleSubmit(e){
    //     e.preventDefault();
    //     e.stopPropagation()

    //     const newLog = {
    //     notes: logForm.notes,
    //     depth: logForm.depth,
    //     bottom_temp: logForm.bottom_temp,
    //     suit_thickness: logForm.suit_thickness,
    //     weight: logForm.weight,
    //     time_in: logForm.time_in,
    //     time_out: logForm.time_out,
    //     boat: logForm.boat,
    //     fresh: logForm.fresh,
    //     date: logForm.date, 
    //     divemaster: logForm.divemaster,
    //     dive_budy: logForm.dive_budy,
    //     signature: signatureState,
    //     user_id: user.id,
    //     site_id: logForm.site_id
    //     }

    //     fetch("/logs", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newLog)
    //     })
    //     .then((response) => response.json())
    //     .then(setLogForm(initialLogForm))
    //     .then(newLog => setLogs([...logs, newLog]))
    //     history.push('/')
    // }

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

    function handleProp(e){
        e.stopPropagation()
        e.preventDefault()
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
                    <Avatar sx={{  width: 80, height: 80, bgcolor: blue[100] }} aria-label="Coral icon by Icons8" src={"https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-coral-world-oceans-day-wanicon-flat-wanicon.png"}>
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
                            labelId= "demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name = "site_id"
                            value = {logForm.site}
                            onChange={handleChange}
                            label = "Location_Id"
                        >
                                <MenuItem>Select Dive Site</MenuItem>
                                {siteMap}
                        </Select>
                    </Grid>

                    <p>Dont see the site you're looking for? </p>
                    <Button variant="outlined" onClick={e =>  goToAddSite(e)}>Add new dive site</Button>
                    
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
                        // autoComplete="new-password"
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
                            // label="time_in"
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
                            // label="time_out"
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
                            // label="date"
                            name="date"
                            value={logForm.date}
                            onChange={handleChange}
                            placeholder="Date"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Fresh Water(T/F)</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            label="fresh"
                            name="fresh"
                            value={logForm.fresh}
                            onChange={handleChange}
                            placeholder="Water Type"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Boat Dive (T/F)</InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            label="boat"
                            name="boat"
                            value={logForm.boat}
                            onChange={handleChange}
                            placeholder="Boat Dive"
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-standard-label">Notes </InputLabel>
                    <br></br>
                        <TextField
                            required
                            fullWidth
                            type="text"
                            label="notes"
                            name="notes"
                            value={logForm.notes}
                            onChange={handleChange}
                            placeholder="Dive Notes"
                        />
                    </Grid>


                <label>Signature</label>
                    <SignaturePad
                    ref = {sigPad}
                    canvasProps={{
                        className: 'signature'
                    }}
                    />
                <Button variant="outlined" onClick={e => save(e)}>Save</Button>
                <Button variant="outlined" onClick={e => clear(e)}>Clear</Button>  

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
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
            </ThemeProvider>
        </div>
    )
}

export default AddDiveLog


// {/* <> */}
// {/* <div>Add Dive Log

// <form onSubmit={handleSubmit}>

// <br></br>
// <br></br>

// <label htmlFor="site">Select Dive Site: </label>
// <select 
//     id="site"
//     name="site_id"
//     value={logForm.site_id}
//     onChange={handleChange}
// >
//     <option>Select Dive Site</option>
//     {siteMap}
// </select>  


// <p>Dont see the site you're looking for? </p>
// <button onClick={e =>  goToAddSite(e)}>Add new dive site</button>

// <br></br>
// <br></br>

// <label htmlFor="depth">Depth: </label>
// <input
//     type="number"
//     label="Depth"
//     name="depth"
//     value={logForm.depth}
//     onChange={handleChange}
//     placeholder="Depth"
// ></input>   

// <br></br>
// <br></br>

// <label htmlFor="suit_thickness">Suit Thinkness(mm): </label>
// <input
//     type="number"
//     label="suit_thickness"
//     name="suit_thickness"
//     value={logForm.suit_thickness}
//     onChange={handleChange}
//     placeholder="Suit Thickness"
// ></input> 

// <br></br>
// <br></br>

// <label htmlFor="bottom_temp">Bottom Temp: </label>
// <input
//     type="number"
//     label="bottom_temp"
//     name="bottom_temp"
//     value={logForm.bottom_temp}
//     onChange={handleChange}
//     placeholder="Bottom Temp"
// ></input>   

// <br></br>
// <br></br>

// <label htmlFor="weight">Weight(lbs): </label>
// <input
//     type="number"
//     label="weight"
//     name="weight"
//     value={logForm.weight}
//     onChange={handleChange}
//     placeholder="Weight"
// ></input> 

// <br></br>
// <br></br>

// <label htmlFor="divemaster">Dive Master: </label>
// <input
//     type="text"
//     label="divemaster"
//     name="divemaster"
//     value={logForm.divemaster}
//     onChange={handleChange}
//     placeholder="Dive Master"
// ></input>

// <br></br>
// <br></br>

// <label htmlFor="dive_budy">Dive Buddy: </label>
// <input
//     type="text"
//     label="dive_budy"
//     name="dive_budy"
//     value={logForm.dive_budy}
//     onChange={handleChange}
//     placeholder="Dive Buddy"
// ></input>

// <br></br>
// <br></br>

// <label htmlFor="time_in">Time In: </label>
// <input
//     type="time"
//     label="time_in"
//     name="time_in"
//     value={logForm.time_in}
//     onChange={handleChange}
//     placeholder="Time In"
// ></input> 

// <br></br>
// <br></br>

// <label htmlFor="time_out">Time Out: </label>
// <input
//     type="time"
//     label="time_out"
//     name="time_out"
//     value={logForm.time_out}
//     onChange={handleChange}
//     placeholder="Time Out"
// ></input> 

// <br></br>
// <br></br>

// <label htmlFor="date">Date: </label>
// <input
//     type="date"
//     label="date"
//     name="date"
//     value={logForm.date}
//     onChange={handleChange}
//     placeholder="Date"
// ></input>

// <br></br>
// <br></br>

// <label htmlFor="fresh">Fresh Water(T/F): </label>
// <input
//     type="text"
//     label="fresh"
//     name="fresh"
//     value={logForm.fresh}
//     onChange={handleChange}
//     placeholder="Water Type"
// ></input>

// <br></br>
// <br></br>

// <label htmlFor="boat">Boat Dive(T/F): </label>
// <input
//     type="text"
//     label="boat"
//     name="boat"
//     value={logForm.boat}
//     onChange={handleChange}
//     placeholder="Boat Dive"
// ></input>    

// <br></br>
// <br></br>

// <label htmlFor="notes">Notes: </label>
// <textarea
//     type="text"
//     label="notes"
//     name="notes"
//     value={logForm.notes}
//     onChange={handleChange}
//     placeholder="Dive Notes"
// ></textarea>

// <br></br>
// <br></br>

//     {/* <Popup 
//     <Popup 

//         modal 
//         trigger={<button onClick={e => handleProp(e)}> Open Signature Pad</button>}
//         closeOnDocumentClick={false}
//     >
//         {close => (
// //         <>    
// //         <label>Signature</label>
// //             <SignaturePad
// //             ref = {sigPad}
// //             canvasProps={{
// //                 className: 'signature'
// //             }}
// //             />
// //         <button onClick={e => save(e)}>Save</button>
// //         <button onClick={e => clear(e)}>Clear</button>  
// //         {/* <button onClick={close}>Close</button> 
// //         </> 
// //         )} 
// //     </Popup>   */}


// //     <input
// //         className="hidden"
// //         type="text"
// //         label="signature"
// //         name="signature"
// //         value={signatureState}
// //         onChange={handleChange}
// //         placeholder="Signature"
// // ></input> 

// // <br></br>
// // <br></br>

// // <button type="submit">Add Log</button>

// // </form>

// //     <button onClick={e => returnHome(e)}>Return Home</button>

// // </div>
// // </> */}