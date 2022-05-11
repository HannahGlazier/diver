import React from 'react'

import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

function Profile({ user }) {

    const follower = user.followers
    const followee = user.followees

    const followerMap = follower.map(f => (
        <li key={f.id}>{f.name}</li>
    ))

    const followeeMap = followee.map(f => (
        <li key={f.id}>{f.name}</li>
    ))

// console.log(user)

    return (
        <div>
            <div className="background"></div>
                <div className="name">
                    <h2>{user.name}'s Profile</h2>
                    <h5>{user.certification_level} / {user.certification_date}</h5>
                    <img src={user.icon} alt="fish icon from https://icons8.com/icons/set/fish"/>
                </div>
                <div className="profile">
                    <h2>I am based in {user.homebase}</h2>

                    <h3>Followers ({followerMap.length})</h3>
                    <h4>{followerMap}</h4>

                    <h3>Following ({followeeMap.length})</h3>
                    <h4>{followeeMap}</h4> 
                {/* <div className="background"></div> */}
            </div>
        </div>
    )
}

export default Profile