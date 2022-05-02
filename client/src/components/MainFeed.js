import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs, handleDeleteLog, user, following, setFollowing, handleFollowState, handleUnfollow }) {

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
        />
    </div>
    )
}

export default MainFeed