import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs, handleDeleteLog, user }) {

    return (
    <div>
        <LogContainer 
            logs={logs} 
            user={user}
            handleDeleteLog={handleDeleteLog} 
        />
    </div>
    )
}

export default MainFeed