import React from 'react'
import LogCard from './LogCard'
// import InfiniteScroll from 'react-infinite-scroll-component';

function LogContainer({ logs, handleDeleteLog, user, following, setFollowing, handleFollowState, handleUnfollow, onFollow }) {
    console.log(user.followees)
    const followeeIds = user.followees.map(f => f.id)
    const logMap = logs.map(log => {
        // console.log(followeeIds.includes(log.user.id))
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
    <div className="container">{logMap}</div>
    )
}

export default LogContainer