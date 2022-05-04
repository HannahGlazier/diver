import React from 'react'
import LogCard from './LogCard'
// import InfiniteScroll from 'react-infinite-scroll-component';

function LogContainer({ logs, handleDeleteLog, user, setUser, following, setFollowing, handleFollowState, handleUnfollow }) {
    

    const logMap = logs.map(log => {
        const followMap = user.followees.some(fol => fol.id === log.user.id)

        // console.log(user.followees)

        return(

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
            // followees={user.followees}
            followee={followMap}
            setUser={setUser}
        />)
    })

    return (
    <div className="container">{logMap}</div>
    )
}

export default LogContainer