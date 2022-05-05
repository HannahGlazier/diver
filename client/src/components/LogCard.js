import React, { useState, useEffect, useRef } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import Grid from '@mui/material/Grid';

// MAP
// import ReactMapGL from "react-map-gl"
import mapboxgl from "mapbox-gl";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function LogCard({
    log,
    handleDeleteLog,
    user,
    userId,
    following,
    setFollowing,
    handleFollowState,
    handleUnfollow,
    isFollowee,
    onChangeFollow,
    long,
  lat,
}) {
    const [followTest, setFollowTest] = useState([]);

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

  // THIS RENDERS!!
  // const map = new mapboxgl.Map({
  //     container: 'map', // container ID
  //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //     center: [-86.52997, 16.32976], // starting position [lng, lat]
  //     zoom: 9 // starting zoom
  //     });

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

    // const followeeMap = user.followees.map((f) => f.id);
    // const doesFollow = followTest.includes(log.user);

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

    const headerLocation = `${log.site.name} - ${log.site.location}`;
    const headerUserName = `${log.user.name}'s Dive Log`;

    return (
        <div>
        <div></div>

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
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={headerLocation}
            subheader={log.date}
            />
            <CardHeader title={headerUserName} />
            <div className="mapbox">
            <Map
                // id = “map”
                // initialViewState={{
                // longitude: -122.4,
                // latitude: 37.8,
                // zoom: 11,
                // }}
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
            <CardContent>
                <Typography paragraph>The Details: </Typography>
                <Typography paragraph>Time In: {log.time_in}</Typography>
                <Typography paragraph>Time Out: {log.time_out}</Typography>
                <Typography paragraph>Bottom Time: {log.bottom_time}</Typography>
                <Typography>Suit Thickness: {log.suit_thickness}</Typography>
                <Typography>Depth: {log.depth}</Typography>
                <Typography>Weight: {log.weight}</Typography>
                <Typography>
                {log.fresh ? "Fresh" : "Salt"} Water -{" "}
                {log.boat ? "Boat" : "Shore"} Dive
                </Typography>
                <Typography>Dive Buddy: {log.dive_budy}</Typography>
                <Typography>Dive Master: {log.divemaster}</Typography>

                <CardMedia
                component="img"
                height="100"
                image={log.signature}
                alt="signature"
                />
            </CardContent>
            </Collapse>
        </Card>
        </div>
    );
}

export default LogCard;
