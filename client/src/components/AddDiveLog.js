import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddSite from './AddSite'

import SignaturePad from 'react-signature-canvas'
import Popup from 'reactjs-popup'
// test commit

function AddDiveLog({ addNewLog, user, setUser, siteState, sites, logs, setLogs }) {
    const [site, setSite] = useState([])

    const initialLogForm = { 
        notes: "",
        depth: "",
        bottom_temp: "",
        suit_thickness: "",
        weight: "",
        time_in: "",
        time_out: "",
        boat: true,
        fresh: false,
        date: "", 
        divemaster: "",
        dive_budy: "",
        signature: "",
        user_id: user.id,
        // site_id: site.id 
    }
    
    const [signatureState, setSignatureState] = useState("")
    const [logForm, setLogForm] = useState(initialLogForm)

    let history = useHistory();

    // Handle Rendering Site Option List
    useEffect(() => {
        fetch("http://localhost:3000/sites")
        .then((response) => response.json())
        .then(site => setSite(site));
        }, []);


    const siteMap = site.map(s => (
        <option
            key={s.id}
            value={s.id}
        >{s.name} - {s.location}</option>
    ))

    // Begin Dive Log Form Handlers

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogForm(logForm => ({...logForm, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation()

        const newLog = {
        notes: logForm.notes,
        depth: logForm.depth,
        bottom_temp: logForm.bottom_temp,
        suit_thickness: logForm.suit_thickness,
        weight: logForm.weight,
        time_in: logForm.time_in,
        time_out: logForm.time_out,
        boat: logForm.boat,
        fresh: logForm.fresh,
        date: logForm.date, 
        divemaster: logForm.divemaster,
        dive_budy: logForm.dive_budy,
        signature: signatureState,
        user_id: user.id,
        site_id: logForm.site_id
        }

        fetch("http://localhost:3000/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLog)
        })
        .then((response) => response.json())
        .then(console.log(newLog))

        // .then(addNewLog(newLog))
        
        .then(setLogForm(initialLogForm))

        // .then(fetch("http://localhost:3000/logs")
        // .then((response) => response.json())
        // .then(logs => setLogs(logs)))

        history.push('/')
    }

    // Signature handlers
    let sigPad = useRef({})
    let data = ''

    function clear(e){
        e.stopPropagation()
        e.preventDefault()
        sigPad.current.clear();
    }

    function save(e){
        e.stopPropagation()
        e.preventDefault()
        data = sigPad.current.toDataURL()
        setSignatureState(data)
    }

    function handleProp(e){
        e.stopPropagation()
        e.preventDefault()
    }
    // END Signature handlers


function goToAddSite(e){
    e.stopPropagation()
    e.preventDefault()
    history.push('/addSite')
}

function returnHome(e){
    e.stopPropagation()
    e.preventDefault()
    history.push('/')
}

    return (
        <>
            <div>Add Dive Log

            <form onSubmit={handleSubmit}>

            <br></br>
            <br></br>

            <label htmlFor="site">Select Dive Site: </label>
            <select 
                id="site"
                name="site_id"
                value={logForm.site_id}
                onChange={handleChange}
            >
                {siteMap}
            </select>  


            <p>Dont see the site you're looking for? </p>
            <button onClick={e =>  goToAddSite(e)}>Add new dive site</button>

            <br></br>
            <br></br>

            <label htmlFor="depth">Depth: </label>
            <input
                type="number"
                label="Depth"
                name="depth"
                value={logForm.depth}
                onChange={handleChange}
                placeholder="Depth"
            ></input>   

            <br></br>
            <br></br>

            <label htmlFor="suit_thickness">Suit Thinkness(mm): </label>
            <input
                type="number"
                label="suit_thickness"
                name="suit_thickness"
                value={logForm.suit_thickness}
                onChange={handleChange}
                placeholder="Suit Thickness"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="bottom_temp">Bottom Temp: </label>
            <input
                type="number"
                label="bottom_temp"
                name="bottom_temp"
                value={logForm.bottom_temp}
                onChange={handleChange}
                placeholder="Bottom Temp"
            ></input>   

            <br></br>
            <br></br>

            <label htmlFor="weight">Weight(lbs): </label>
            <input
                type="number"
                label="weight"
                name="weight"
                value={logForm.weight}
                onChange={handleChange}
                placeholder="Weight"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="divemaster">Dive Master: </label>
            <input
                type="text"
                label="divemaster"
                name="divemaster"
                value={logForm.divemaster}
                onChange={handleChange}
                placeholder="Dive Master"
            ></input>

            <br></br>
            <br></br>

            <label htmlFor="dive_budy">Dive Buddy: </label>
            <input
                type="text"
                label="dive_budy"
                name="dive_budy"
                value={logForm.dive_budy}
                onChange={handleChange}
                placeholder="Dive Buddy"
            ></input>

            <br></br>
            <br></br>

            <label htmlFor="time_in">Time In: </label>
            <input
                type="time"
                label="time_in"
                name="time_in"
                value={logForm.time_in}
                onChange={handleChange}
                placeholder="Time In"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="time_out">Time Out: </label>
            <input
                type="time"
                label="time_out"
                name="time_out"
                value={logForm.time_out}
                onChange={handleChange}
                placeholder="Time Out"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="date">Date: </label>
            <input
                type="date"
                label="date"
                name="date"
                value={logForm.date}
                onChange={handleChange}
                placeholder="Date"
            ></input>

            <br></br>
            <br></br>

            <label htmlFor="fresh">Fresh Water(T/F): </label>
            <input
                type="text"
                label="fresh"
                name="fresh"
                value={logForm.fresh}
                onChange={handleChange}
                placeholder="Water Type"
            ></input>

            <br></br>
            <br></br>

            <label htmlFor="boat">Boat Dive(T/F): </label>
            <input
                type="text"
                label="boat"
                name="boat"
                value={logForm.boat}
                onChange={handleChange}
                placeholder="Boat Dive"
            ></input>    

            <br></br>
            <br></br>

            <label htmlFor="notes">Notes: </label>
            <textarea
                type="text"
                label="notes"
                name="notes"
                value={logForm.notes}
                onChange={handleChange}
                placeholder="Dive Notes"
            ></textarea>
            
            <br></br>
            <br></br>

                {/* <Popup 
                <Popup 

                    modal 
                    trigger={<button onClick={e => handleProp(e)}> Open Signature Pad</button>}
                    closeOnDocumentClick={false}
                >
                    {close => (
                    <>    */}
                    <label>Signature</label>
                        <SignaturePad
                        ref = {sigPad}
                        canvasProps={{
                            className: 'signature'
                        }}
                        />
                    <button onClick={e => save(e)}>Save</button>
                    <button onClick={e => clear(e)}>Clear</button>  
                    {/* <button onClick={close}>Close</button> 
                    </> 
                    )} 
                </Popup>   */}


                <input
                    className="hidden"
                    type="text"
                    label="signature"
                    name="signature"
                    value={signatureState}
                    onChange={handleChange}
                    placeholder="Signature"
            ></input> 

            <br></br>
            <br></br>

            <button type="submit">Add Log</button>

            </form>

                <button onClick={e => returnHome(e)}>Return Home</button>

            </div>
        </>
    )
}

export default AddDiveLog


