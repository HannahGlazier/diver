import React from 'react'
import LogContainer from './LogContainer'

function MainFeed({ logs }) {

    return (
    <div>
        <LogContainer logs={logs}/>
    </div>
    )
}

export default MainFeed