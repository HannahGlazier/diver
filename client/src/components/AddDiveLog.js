import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddSite from './AddSite'

import SignaturePad from 'react-signature-canvas'
import Popup from 'reactjs-popup'


function AddDiveLog({ addNewLog, user, setUser, siteState }) {

    const initialLogForm = { 
        notes: "",
        depth: "",
        bottomTime: "",
        suitThickness: "",
        weight: "",
        timeIn: "",
        timeOut: "",
        boat: true,
        fresh: false,
        date: "", 
        divemaster: "",
        diveBuddy: "",
        signature: "",
        user_id: user.id,
        // site_id: siteState.id  
    }
    
    const [signatureState, setSignatureState] = useState("")
    const [logForm, setLogForm] = useState(initialLogForm)
    const [site, setSite] = useState([])

    useEffect(() => {
    fetch("/last")
    .then((response) => response.json())
    .then(site => setSite(site));
    }, []);

    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogForm(logForm => ({...logForm, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation(e)

        const newLog = {
        notes: logForm.notes,
        depth: logForm.depth,
        bottomTime: logForm.bottomTime,
        suitThickness: logForm.suitThickness,
        weight: logForm.weight,
        timeIn: logForm.timeIn,
        timeOut: logForm.timeOut,
        boat: logForm.boat,
        fresh: logForm.fresh,
        date: logForm.date, 
        divemaster: logForm.divemaster,
        diveBuddy: logForm.diveBuddy,
        signature: signatureState,
        user_id: user.id,
        site_id: site.id 
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
        .then(setLogForm(initialLogForm))
    }

    // Signature handlers
    let sigPad = useRef({})
    let data = '';

    function clear(e){
        e.stopPropagation()
        sigPad.current.clear();
    }

    function save(){
        data = sigPad.current.toDataURL()
        setSignatureState(data)
    }

    function show(){
        sigPad.current.fromDataURL(data)
    }

    function handleProp(e){
        e.stopPropagation()
    }
    // END Signature handlers

    return (
        <>
            {/* <AddSite /> */}
            <div>Add Dive Log

            <form onSubmit={handleSubmit}>

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

            <label htmlFor="suitThickness">Suit Thinkness(mm): </label>
            <input
                type="number"
                label="suitThickness"
                name="suitThickness"
                value={logForm.suitThickness}
                onChange={handleChange}
                placeholder="Suit Thickness"
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

            <label htmlFor="diveBuddy">Dive Buddy: </label>
            <input
                type="text"
                label="diveBuddy"
                name="diveBuddy"
                value={logForm.diveBuddy}
                onChange={handleChange}
                placeholder="Dive Buddy"
            ></input>

            <br></br>
            <br></br>

            <label htmlFor="timeIn">Time In: </label>
            <input
                type="time"
                label="timeIn"
                name="timeIn"
                value={logForm.timeIn}
                onChange={handleChange}
                placeholder="Time In"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="timeOut">Time Out: </label>
            <input
                type="time"
                label="timeOut"
                name="timeOut"
                value={logForm.timeOut}
                onChange={handleChange}
                placeholder="Time Out"
            ></input> 

            <br></br>
            <br></br>

            <label htmlFor="bottomTime">Bottom Time: </label>
            <input
                type="time"
                label="bottomTime"
                name="bottomTime"
                value={logForm.bottomTime}
                onChange={handleChange}
                placeholder="Bottom Time"
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

            {/* <label htmlFor="site_id">Dive Site: </label>
            <input
                type="number"
                label="site"
                name="site_id"
                value={logForm.site_id}
                onChange={handleChange}
                placeholder="Dive Site"
            ></input>     */}

            <br></br>
            <br></br>

                {/* <Popup 
                    modal 
                    trigger={<button> Open Signature Pad</button>}
                    closeOnDocumentClick={false}
                >
                    {close => (
                    <>   */}
                    <label>Signature</label>
                        <SignaturePad
                        ref = {sigPad}
                        canvasProps={{
                            className: 'signature'
                        }}
                        />
                    <button onClick={save}>Save</button>
                    <button onClick={show}>Show</button>
                    <button onClick={(e)=> clear(e)}>Clear</button>  
                    {/* <button onClick={close}>Close</button> */}
                    {/* </> */}
                    {/* )} 
                </Popup>  */}


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
            </div>
        </>
    )
}

export default AddDiveLog


