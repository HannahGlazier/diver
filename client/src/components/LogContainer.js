import React, { useState } from 'react'
import LogCard from './LogCard'
// import InfiniteScroll from 'react-infinite-scroll-component';

// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    setFilterBy, 
    fetchData,
    handlerStreamAborted,
    hasMore
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
            long={log.site.long}
            lat={log.site.lat}
            fetchData={fetchData}
        />
    )})

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">View:</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={handleFilterBy}
                label="View"
            >
                <MenuItem value="explore">Explore</MenuItem>
                <MenuItem value="following">Folowing</MenuItem>
                <MenuItem value="self">Self</MenuItem>
            </Select>
        </FormControl>

        <InfiniteScroll
            dataLength={logs.length} //This is important field to render the next data
            next={fetchData}
            // hasMore={true}
            hasMore={hasMore}
            loader={<h4 className="scroll">Loading...</h4>}
            endMessage={
                <p className="scroll">
                    <b>Yay! You have seen all the dive logs!</b>
                </p>
            }
            >
                {logMap}
        </InfiniteScroll>

        </div>
    )
}

export default LogContainer

