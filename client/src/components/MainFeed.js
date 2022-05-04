import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs, handleDeleteLog, user, following, setFollowing, handleFollowState, handleUnfollow, onFollow }) {

// function MainFeed({ logs, handleDeleteLog, user, setUser, following, setFollowing, handleFollowState, handleUnfollow }) {

    return (
    <div>
        <LogContainer 
            logs={logs} 
            user={user}
            handleDeleteLog={handleDeleteLog}
            following={following}
            setFollowing={setFollowing}
            handleFollowState={handleFollowState}
            handleUnfollow={handleUnfollow}
            onFollow={onFollow}
        />
    </div>
    )
}

export default MainFeed