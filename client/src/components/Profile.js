import React from 'react'

// MUI Imports
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

function Profile({ user }) {

    function Copyright() {
        return (
            <div className="center">
            <a href= "https://github.com/HannahGlazier" target="_blank" rel="noreferrer"><GitHubIcon/> Hannah Glazier </a>
            </div>
        );
        }

    const follower = user.followers
    const followee = user.followees

    const followerMap = follower.map(f => (
        <li key={f.id}>{f.name}</li>
    ))

    const followeeMap = followee.map(f => (
        <li key={f.id}>{f.name}</li>
    ))


    return (
<div className="background">

    <Card
    className="prof-card" 
    sx={{ maxWidth: 345 }}
    >

        <img src={user.icon} alt="fish icon from https://icons8.com/icons/set/fish"></img>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {user.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {user.certification_level}
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
            Based in - {user.homebase}
            </Typography>

            <Typography cvariant="body2" color="text.secondary">
                
                <div  className="follow">
                <Typography color="text.primary">Followers ({followerMap.length})</Typography>
                <Typography>{followerMap}</Typography>
                </div>

                <div  className="follow">
                <Typography color="text.primary">Following ({followeeMap.length})</Typography>
                <Typography>{followeeMap}</Typography>
                </div>

                </Typography>

        </CardContent>
        </Card>
        <Copyright sx={{ mt: 5 }} />
        </div>
    )
}

export default Profile