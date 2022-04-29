import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs, handleDeleteLog }) {

    return (
    <div>
        <LogContainer logs={logs} handleDeleteLog={handleDeleteLog} />
    </div>
    )
}

export default MainFeed