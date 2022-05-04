import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs, handleDeleteLog, user, following, setFollowing, handleFollowState, handleUnfollow, onFollow }) {

    return (
    <div  className="container">
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