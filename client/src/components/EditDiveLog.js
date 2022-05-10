import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddSite from "./AddSite";
import Profile from "./Profile";

import SignaturePad from "react-signature-canvas";
import Popper from "@mui/material/Popper";

import GitHubIcon from "@mui/icons-material/GitHub";
import { blue } from "@mui/material/colors";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    MenuItem,
    Select,
    InputLabel,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    FormControl,
    } from "@mui/material";

    function Copyright() {
    return (
        <div id="github">
        <a
            href="https://github.com/HannahGlazier"
            target="_blank"
            rel="noreferrer"
        >
            <GitHubIcon /> Hannah Glazier{" "}
        </a>
        </div>
    );
    }
    const theme = createTheme();

    function AddDiveLog({
    addNewLog,
    user,
    setUser,
    siteState,
    sites,
    logs,
    setLogs,
    log,
    onUpdateLog,
    setShowForm,
    theme,
    }) {
    // const [site, setSite] = useState([])
    const [site, setSite] = useState([]);

    const [notes, setNotes] = useState(log.notes);
    const [depth, setDepth] = useState(log.depth);
    const [bottom_temp, setBottom_temp] = useState(log.bottom_temp);
    const [suit_thickness, setSuit_thickness] = useState(log.suit_thickness);
    const [weight, setWeight] = useState(log.weight);
    const [time_in, setTime_in] = useState(log.time_in);
    const [time_out, setTime_out] = useState(log.time_out);
    const [boat, setBoat] = useState(log.boat);
    const [fresh, setFresh] = useState(log.fresh);
    const [date, setDate] = useState(log.date);
    const [divemaster, setDivemaster] = useState(log.divemaster);
    const [dive_budy, setDive_budy] = useState(log.dive_budy);
    const [signature, setSignature] = useState(log.signature);
    const [site_id, setSite_id] = useState(log.site_id);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const [signatureState, setSignatureState] = useState("");
    const [placement, setPlacement] = React.useState();
    // const [logForm, setLogForm] = useState(initialLogForm)

    let history = useHistory();

    // Handle Rendering Site Option List
    useEffect(() => {
        fetch("/sites")
        .then((response) => response.json())
        .then((site) => setSite(site));
    }, []);

    const siteMap = site.map((s) => (
        <MenuItem key={s.id + Math.random()} value={s.id}>
        {s.name} - {s.location}
        </MenuItem>
    ));

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`/logs/${log.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            notes,
            depth,
            bottom_temp,
            suit_thickness,
            weight,
            time_in,
            time_out,
            boat,
            fresh,
            date,
            divemaster,
            dive_budy,
            signature,
            site_id,
        }),
        }).then((r) => {
        if (r.ok) {
            r.json().then((updateLog) => {
            onUpdateLog(updateLog);
            // console.log(updateLog)
            // history.push('/')
            setShowForm(true);
            });
            // .then(updateLog => setLogs([...logs, updateLog]))
        } else {
            r.json().then((err) => window.alert(err.errors));
        }
        });
    }

    // Signature handlers
    let sigPad = useRef({});
    let data = "";

    function clear(e) {
        e.stopPropagation();
        e.preventDefault();
        sigPad.current.clear();
    }

    function save(e) {
        e.stopPropagation();
        e.preventDefault();
        data = sigPad.current.toDataURL();
        setSignatureState(data);
    }

    function handleProp(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    // END Signature handlers

    function goToAddSite(e) {
        e.stopPropagation();
        e.preventDefault();
        history.push("/addSite");
    }

    function returnHome(e) {
        e.stopPropagation();
        e.preventDefault();
        history.push("/");
    }

    return (
        <ThemeProvider theme={theme}>
            <Button aria-describedby={id} type="button" onClick={handleClick}>
            Toggle Popper
            </Button>
            <Popper
                disablePortal={true}
            
                transition
                placement="bottom"
                modifiers={{
                    preventOverflow: 
                        {
                            enabled: true, 
                            escapeWithReference: true , 
                            boundariesElement: 'viewport'}
                        }
                    }
                
                open={open} 
                anchorEl={anchorEl} >
            <Grid 
            container
            className="edit">
                
                <Box>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Edit Dive Log
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={(e) => handleSubmit(e)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Select Dive Site
                            </InputLabel>
                            <br></br>
                            <Select
                            required
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="site_id"
                            value={site_id}
                            onChange={(e) => setSite_id(e.target.value)}
                            label="site_id"
                            >
                            <MenuItem>Select Dive Site</MenuItem>
                            {siteMap}
                            </Select>
                        </Grid>

                        {/* <p>Dont see the site you're looking for? </p> */}
                        <InputLabel id="demo-simple-select-standard-label">
                            Dont see the site you're looking for?
                        </InputLabel>

                        <Button
                            variant="outlined"
                            onClick={(e) => goToAddSite(e)}
                        >
                            Add new dive site
                        </Button>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Depth
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            name="depth"
                            label="Depth"
                            type="number"
                            // id="password"
                            value={depth}
                            onChange={(e) => setDepth(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Suit Thickness(mm)
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            name="suit_thickness"
                            label="Suit Thickness"
                            type="number"
                            id="suit_thickness"
                            value={suit_thickness}
                            onChange={(e) => setSuit_thickness(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Bottom Temp
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            name="bottom_temp"
                            label="Bottom Temp"
                            type="number"
                            id="bottom_temp"
                            value={bottom_temp}
                            onChange={(e) => setBottom_temp(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Weight(lbs)
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            name="weight"
                            label="Weight"
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Dive Master
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            name="divemaster"
                            label="Dive Master"
                            type="text"
                            id="divemaster"
                            value={divemaster}
                            onChange={(e) => setDivemaster(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Dive Buddy
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            type="text"
                            label="Dive Buddy"
                            name="dive_budy"
                            value={dive_budy}
                            onChange={(e) => setDive_budy(e.target.value)}
                            placeholder="Dive Buddy"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Time In
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            type="time"
                            // label="time_in"
                            name="time_in"
                            value={time_in}
                            onChange={(e) => setTime_in(e.target.value)}
                            placeholder="Time In"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Time Out
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            type="time"
                            // label="time_out"
                            name="time_out"
                            value={time_out}
                            onChange={(e) => setTime_out(e.target.value)}
                            placeholder="Time Out"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Date
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            type="date"
                            // label="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Date"
                            />
                        </Grid>

                        <Grid>
                            <InputLabel id="demo-simple-select-standard-label">
                            Select Water Type
                            </InputLabel>
                            <br></br>
                            <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="fresh"
                            value={fresh}
                            onChange={(e) => setFresh(e.target.value)}
                            label="fresh"
                            >
                            <MenuItem value="false">Salt Water</MenuItem>
                            <MenuItem value="true">Fresh Water</MenuItem>
                            </Select>
                        </Grid>

                        <Grid>
                            <InputLabel id="demo-simple-select-standard-label">
                            Select Dive Type
                            </InputLabel>
                            <br></br>
                            <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="boat"
                            value={boat}
                            onChange={(e) => setBoat(e.target.value)}
                            label="boat"
                            >
                            <MenuItem value="true">Boat Dive</MenuItem>
                            <MenuItem value="false">Shore Dive</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-standard-label">
                            Notes{" "}
                            </InputLabel>
                            <br></br>
                            <TextField
                            required
                            fullWidth
                            type="text"
                            label="notes"
                            name="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Dive Notes"
                            />
                        </Grid>

                        <label>Signature</label>
                        <SignaturePad
                            ref={sigPad}
                            canvasProps={{
                            className: "signature",
                            }}
                        />
                        <Button variant="outlined" onClick={(e) => save(e)}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={(e) => clear(e)}>
                            Clear
                        </Button>

                        <input
                            className="hidden"
                            type="text"
                            label="signature"
                            name="signature"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            placeholder="Signature"
                        ></input>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Update
                        </Button>
                    </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container>
                </Box>
            </Grid>
            </Popper>
        </ThemeProvider>
  );
}

export default AddDiveLog;
