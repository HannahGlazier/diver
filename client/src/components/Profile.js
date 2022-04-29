import React from 'react'

function Profile({ user }) {

    const follower = user.followers
    const followee = user.followees
    // console.log(user)
    const followerMap = follower.map(f => f.name)
    const followeeMap = followee.map(f => f.name)


    return (
        <div>
            <h1>Profile Page</h1>
            <h2>{user.name}</h2>

            <h3>Followers</h3>
            <h4>{followerMap}</h4>

            <h3>Following</h3>
            <h4>{followeeMap}</h4> 
        </div>
    )
}

export default Profile