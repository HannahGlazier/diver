import React, { useState } from "react"
import EditDiveLog from "./EditDiveLog";

// MUI Imports
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, ThemeProvider, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { blue } from "@mui/material/colors";

// Popup
import { Modal } from "react-bootstrap";

// MAP
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function LogCard({
    log,
    handleDeleteLog,
    user,
    userId,
    isFollowee,
    onChangeFollow,
    long,
    lat,
    onUpdateLog,
    setLogs,
    logs,
    theme,
    }) {

    // State
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Map Handlers
    const MAPBOX_TOKEN =
        "pk.eyJ1IjoiaGFubmFoZ2xhemllciIsImEiOiJjbDJ0OWdzdjcwMTVsM29wZjM4YWQ4anhvIn0.2kctdgtMavhxgpP996WXhA";

    const [isPopupOpen, setIsPopupOpen] = useState({
        0: false,
    });

    const [viewState, setViewState] = useState({
        latitude: lat,
        longitude: long,
        zoom: 6,
    });

    // Material UI Styling
    
    const [expanded, setExpanded] = React.useState(false);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
        }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // END Material UI Styling

    // POST Follow
    function handleFollow() {
        const newFollow = {
        follower_id: user.id,
        followee_id: log.user.id,
        };

        fetch("/follows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newFollow),
        })
        .then((response) => response.json())
        .then((newFollowee) => {
            onChangeFollow({
            ...user,
            followees: [...user.followees, newFollowee.followee],
            });
        });
    }

    // DELETE Unfollow

    function handleDeleteFolow() {
        fetch(`/follows/${log.user.id}`, { method: "DELETE" });
        const filteredFollowees = user.followees.filter(
        (fol) => fol.id !== log.user.id
        );
        onChangeFollow({
        ...user,
        followees: filteredFollowees,
        });
    }

    function handleFollowConditional() {
        if (isFollowee && userId !== log.user.id) {
        return (
            <Button variant="contained" onClick={(fol) => handleDeleteFolow(fol)}>
            Unfollow
            </Button>
        );
        } else if (!isFollowee && userId !== log.user.id) {
        return (
            <Button variant="contained" onClick={handleFollow}>
            Follow
            </Button>
        );
        }
    }

    // Handle deleting your personal Dive logs
    function handleDelete(e) {
        e.stopPropagation();
        handleDeleteLog(log);
    }

    const deleteLog = userId === log.user.id && (
        <Button variant="contained" onClick={(e) => handleDelete(e)}>
        Delete Log
        </Button>
    );


    const editLog = userId === log.user.id && (
        <EditIcon
        variant="link"
    
        ></EditIcon>
    );


    const headerLocation = `${log.site.name} - ${log.site.location}`;
    const headerUserName = `${log.user.name}'s Dive Log`;

    return (
        <ThemeProvider theme={theme}>
        <div>
            <Card className="container" sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar
                    sx={{ bgcolor: blue[100] }}
                    aria-label="fish icon"
                    src={log.user.icon}
                    alt="fish icon from https://icons8.com/icons/set/fish"
                ></Avatar>
                }
                action={
                <IconButton aria-label="settings"  onClick={handleShow}>
                    {editLog}
                </IconButton>
                }
                title={headerLocation}
                subheader={log.date}
            />
            <CardHeader  title={headerUserName} />
            <div className="mapbox">
                <Map
                initialViewState={{ ...viewState }}
                style={{ width: 323, height: 300 }}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                >
                <div key={log.site.id}>
                    <Marker
                    longitude={long}
                    latitude={lat}
                    color="blue"
                    onClick={() =>
                        setIsPopupOpen({ ...isPopupOpen, [log.site.id]: true })
                    }
                    />

                    {isPopupOpen[log.site.id] && (
                    <Popup
                        key={log.site.id}
                        longitude={long}
                        latitude={lat}
                        color="green"
                        closeOnClick={false}
                        onClose={() => setIsPopupOpen(false)}
                    >
                        <div>
                        <h4>Name: {log.site.name}</h4>
                        <h5>Location: {log.site.location}</h5>
                        <h5>
                            {lat}, {long}
                        </h5>
                        </div>
                    </Popup>
                    )}
                </div>
                </Map>
            </div>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                - Dive Notes -
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {log.notes}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {handleFollowConditional()}
                {deleteLog}

                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className="center">
                <Typography variant="body" color="text.primary">-The Details-</Typography>
                <br></br>
                <br></br>
                <Typography paragraph variant="body2" color="text.secondary">Time In: {log.time_in}</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Time Out: {log.time_out}</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Bottom Time: {log.bottom_time} minutes</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Bottom Temp: {log.bottom_temp}</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Suit Thickness: {log.suit_thickness} mm</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Depth: {log.depth}'</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Weight: {log.weight} lbs</Typography>
                <Typography paragraph variant="body2" color="text.secondary">
                    {log.fresh ? "Fresh" : "Salt"} Water -{" "}
                    {log.boat ? "Boat" : "Shore"} Dive
                </Typography>
                <Typography paragraph variant="body2" color="text.secondary">Dive Buddy: {log.dive_budy}</Typography>
                <Typography paragraph variant="body2" color="text.secondary">Dive Master: {log.divemaster}</Typography>
                
                <Typography variant="body" color="text.primary">Dive Master or Dive Buddy Signature:</Typography>
                <CardMedia
                    component="img"
                    height="100"
                    image={log.signature}
                    alt="signature"
                />
                </CardContent>
            </Collapse>
            </Card>

            <div>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton> 
                <Modal.Title>Edit Dive Log</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <EditDiveLog
                    theme={theme}
                    log={log}
                    logs={logs}
                    onUpdateLog={onUpdateLog}
                />
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>


            </div>
        </div>
        </ThemeProvider>
    );
}

export default LogCard;
