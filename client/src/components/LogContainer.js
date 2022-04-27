import React from 'react'
import LogCard from './LogCard'
import InfiniteScroll from 'react-infinite-scroll-component';

function LogContainer({ logs }) {
    
    const logMap = logs.map(log => (
        <LogCard
            key={log.id}
            log={log}
        />
    ))

    return (
    <div className="container">{logMap}</div>
    )
}

export default LogContainer