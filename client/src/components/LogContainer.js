import React from 'react'
import LogCard from './LogCard'

function LogContainer({ logs }) {
    
    const logMap = logs.map(log => (
        <LogCard
            key={log.id}
            log={log}
        />
    ))

    return (
    <div>{logMap}</div>
    )
}

export default LogContainer