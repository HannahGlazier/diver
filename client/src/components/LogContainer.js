import React, { useState } from 'react'
import LogCard from './LogCard'
// import InfiniteScroll from 'react-infinite-scroll-component';

// MUI imports
import { InputLabel, MenuItem, FormControl, Select, TextField } from "@mui/material";

function LogContainer({ 
    logs, 
    handleDeleteLog, 
    user, 
    following, 
    setFollowing, 
    handleFollowState, 
    handleUnfollow, 
    onFollow, 
    setFilterBy 
}) {

    const [sort, setSort] = useState("");

    function handleFilterBy(e){
        setFilterBy(e.target.value)
    }
    
    const followeeIds = user.followees.map(f => f.id)
    const logMap = logs.map(log => {
        const isFollowee = followeeIds.includes(log.user.id)

        return (
        <LogCard
            key={log.id}
            log={log}
            handleDeleteLog={handleDeleteLog}
            user={user}
            userId={user.id}
            following={following}
            setFollowing={setFollowing}
            handleFollowState={handleFollowState}
            handleUnfollow={handleUnfollow}
            isFollowee={isFollowee}
            onChangeFollow={onFollow}
        />
    )})

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={handleFilterBy}
            >
                <MenuItem value="explore">Explore</MenuItem>
                <MenuItem value="following">Folowing</MenuItem>
                <MenuItem value="self">Self</MenuItem>
            </Select>
        </FormControl>

            {logMap}
        
        </div>
    )
}

export default LogContainer










// import React from 'react'
// import LogCard from './LogCard'
// // import InfiniteScroll from 'react-infinite-scroll-component';


// function LogContainer({ logs, handleDeleteLog, user, following, setFollowing, handleFollowState, handleUnfollow, onFollow }) {
//     console.log(user.followees)
//     const followeeIds = user.followees.map(f => f.id)
//     const logMap = logs.map(log => {
//         // console.log(followeeIds.includes(log.user.id))
//         const isFollowee = followeeIds.includes(log.user.id)
//         return (

// function LogContainer({ logs, handleDeleteLog, user, setUser, following, setFollowing, handleFollowState, handleUnfollow }) {
    

//     const logMap = logs.map(log => {
//         const followMap = user.followees.some(fol => fol.id === log.user.id)

//         // console.log(user.followees)

//         return(


//         <LogCard
//             key={log.id}
//             log={log}
//             handleDeleteLog={handleDeleteLog}
//             user={user}
//             userId={user.id}
//             following={following}
//             setFollowing={setFollowing}
//             handleFollowState={handleFollowState}
//             handleUnfollow={handleUnfollow}
//             isFollowee={isFollowee}
//             onChangeFollow={onFollow}
//         />
//     )})

  


//     return (
//     <div className="container">{logMap}</div>
//     )
// }

// export default LogContainer