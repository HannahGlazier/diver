import React from 'react'
import LogCard from './LogCard'
import InfiniteScroll from 'react-infinite-scroll-component';

function LogContainer({ logs, handleDeleteLog }) {
    
    const logMap = logs.map(log => (
        <LogCard
            key={log.id}
            log={log}
            handleDeleteLog={handleDeleteLog}
        />
    ))

    return (
    <div className="container">{logMap}</div>
    )
}

export default LogContainer