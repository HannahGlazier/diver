import React from 'react'

function LogCard({ log }) {
    
    return (
        <div className="log">
            <h4>{log.site.name} - {log.site.location}</h4>
            <h5>{log.user.name}'s Log</h5>
            <h6>Time In: {log.time_in}</h6>
            <h6>Time Out: {log.time_out}</h6>
            <h6>Depth: {log.depth}'</h6>
            <h6>Suit Thickness: {log.suit_thickness}mm</h6>
            <h6>Weight: {log.weight}lbs</h6>
            <h6>Dive Master: {log.divemaster}</h6>
            <h6>Water: {log.fresh ? 'Fresh' : 'Salt'}</h6>
            <h6>{log.boat ? "Boat" : "Shore"} dive</h6>
            <h6>NOTES: {log.notes}</h6>
        </div>
    )
}

export default LogCard