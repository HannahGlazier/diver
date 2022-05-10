import React from 'react'

import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

function Profile({ user }) {

    const follower = user.followers
    const followee = user.followees
    // console.log(user)
    const followerMap = follower.map(f => f.name + " ")
    const followeeMap = followee.map(f => f.name + " ")

// console.log(user)

    return (
        <div className="profile">
            <div className="background"><h2>{user.name}'s Profile</h2></div>
                
                <img src={user.icon} alt="fish icon from https://icons8.com/icons/set/fish"/>
                <h2>Homebase: {user.homebase}</h2>
                <h2>Certification Level: {user.certification_level} / {user.certification_date}</h2>

                <h3>Followers</h3>
                <h4>{followerMap}</h4>

                <h3>Following</h3>
                <h4>{followeeMap}</h4> 
            {/* <div className="background"></div> */}
        </div>
    )
}

export default Profile