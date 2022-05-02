import React, {useState} from 'react'


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function LogCard({ log, handleDeleteLog, user, userId, following, setFollowing, handleFollowState, handleUnfollow }) {

    // Material UI Styling
    const [expanded, setExpanded] = React.useState(false);

    const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
        };
    // END Material UI Styling

    // POST Follow
    function handleFollow(e){
        e.stopPropagation(e)

        const newFollow = {
            follower_id: user.id,
            followee_id: log.user.id
        }

        fetch('/follows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollow)
        })
        .then(response => response.json())
        .then(console.log(newFollow))
    }

    // DELETE Unfollow

    // function handleUnfollow(follow){
    //     fetch(`http://localhost:3000/follows/${follow.id}`, { method: 'DELETE' })
    //     console.log(follow)
    //     const newFollow = following.filter( indivdual => indivdual !== follow)
    //     setFollowing(newFollow)
    // }

    // function handleFollowConditional(e){
    //     if (userId !== log.user.id){
    //         return (<Button onClick={e => handleFollow(e)}>Follow</Button>)
    //     } else if (user.followers.includes(log.user.id)){
    //         return (<Button onClick={follow => handleUnfollow(follow)}>Unfollow</Button>)
    //     }
    // // }
    function handleDeleteFolow(){
            // e.stopPropagation(e)
            // handleUnfollow(follow)


            fetch(`/follows/${log.user.id}`, { method: 'DELETE' })
            console.log(log.user.id)
            
        }


    const followeeMap = user.followees.map(f => f.id)
    

    function handleFollowConditional(e){
        if (followeeMap.includes(log.user.id)){
            return (<Button variant="contained" onClick={handleDeleteFolow}>Unfollow</Button>)
        } else if (userId !== log.user.id){
            return (<Button variant="contained" onClick={e => handleFollow(e)}>Follow</Button>)
        }
    }

    // Handle deleting your personal Dive logs
    function handleDelete(e){
        e.stopPropagation();
        handleDeleteLog(log)
    }

    const deleteLog = userId === log.user.id &&  <Button variant="contained" onClick={e => handleDelete(e)}>Delete Log</Button>
    
    // const follow = userId !== log.user.id && ( <Button 
    //     variant="contained"  
    //     onClick={e => handleFollowConditional(e)}
    //     >Follow Diver</Button>)

    const follow = handleFollowConditional()

    // const follow = {
    // if (userId != log.user.id) && (user.id !== follower_id) {
    //     return <Button variant="contained" onClick={e => handleFollow(e)}>Follow Diver</Button>
    // }
    // }

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {log.user.name[0]}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={log.site.name}
            subheader={log.date}
        />
        <CardHeader 
            title={log.user.name}
        />  
        {/* <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
        /> */}
        <CardContent>
        <Typography variant="body2" color="text.secondary">- Dive Notes -</Typography>
            <Typography variant="body2" color="text.secondary">
                {log.notes}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>

            {follow}
            {/* <Button onClick={handleDeleteFolow}>Unfollow</Button> */}

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
            <Typography>{log.fresh ? 'Fresh' : 'Salt'} Water - {log.boat ? "Boat" : "Shore"} Dive</Typography>
            <Typography>Dive Buddy: {log.dive_budy}</Typography>
            <Typography>Dive Master: {log.divemaster}</Typography>

            <CardMedia
            component="img"
            height="100"
            image={log.signature}
            alt="signature"/>
            </CardContent>
        </Collapse>
        </Card>
    )
}

export default LogCard





        // <div className="log">
        //     <h4>{log.site.name} - {log.site.location}</h4>
        //     <h5>{log.user.name}'s Log</h5>
        //     <h6>Time In: {log.time_in}</h6>
        //     <h6>Time Out: {log.time_out}</h6>
        //     <h6>Bottom Time: {log.bottom_time} minutes</h6>
        //     <h6>Depth: {log.depth}'</h6>
        //     <h6>Suit Thickness: {log.suit_thickness}mm</h6>
        //     <h6>Weight: {log.weight}lbs</h6>
        //     <h6>Water: {log.fresh ? 'Fresh' : 'Salt'}</h6>
        //     <h6>{log.boat ? "Boat" : "Shore"} dive</h6>
        //     <h6>NOTES: {log.notes}</h6>
        //     <h6>Dive Master: {log.divemaster}</h6>
        //     <img
        //         src={log.signature}
        //         alt="signature"
        //         className="signature-img"
        //     ></img>
        //     {deleteLog}
        //     {follow}
        // </div>