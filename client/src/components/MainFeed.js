import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ 
    logs, 
    handleDeleteLog, 
    user, 
    following, 
    setFollowing, 
    handleFollowState, 
    handleUnfollow, 
    onFollow,
    setFilterBy,
    fetchLogs,
    fetchData,
    hasMore
}) {



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
            setFilterBy={setFilterBy}
            fetchLogs={fetchLogs}
            fetchData={fetchData}
            hasMore={hasMore}
        />
    </div>
    )
}

export default MainFeed