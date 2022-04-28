import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import SignaturePad from 'react-signature-canvas'
import SignIn from "./SignIn";

function AddDiveLog({ addNewLog, user, setUser }) {
    let history = useHistory();

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
        user_id: user.id 
    }

    const [logForm, setLogForm] = useState(initialLogForm)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogForm(logForm => ({...logForm, [name]: value}))
    }

    // function handleChange (e){
    //     setFormLogData(formLogData => ({
    //         ...formLogData, [e.target.value]: e.target.value
    //     })
    //     )
    // }

    function handleSubmit(e){
        e.preventDefault();

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
        signature: logForm.signature,
        user_id: user.id 
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

    function clear(){
        sigPad.current.clear();
    }

    function save(){
        data = sigPad.current.toDataURL()
        console.log(data)
    }

    function show(){
        sigPad.current.fromDataURL(data)
    }
    // END Signature handlers

    return (
        <div>Add Dive Log

        <form onSubmit={handleSubmit}>

        <label htmlFor="notes">Notes: </label>
        <input
            type="text"
            label="notes"
            name="notes"
            value={logForm.notes}
            // id={FormData.notes}
            onChange={handleChange}
            placeholder="Dive Notes"
        ></input>

        <br></br>
        <br></br>

        <label htmlFor="depth">Depth: </label>
        <input
            type="number"
            label="Depth"
            name="depth"
            value={logForm.depth}
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
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
            // id={FormData.notes}
            onChange={handleChange}
            placeholder="Date"
        ></input>

        <br></br>
        <br></br>

        <label htmlFor="fresh">Fresh Water(T/F): </label>
        <input
            type="fresh"
            label="fresh"
            name="fresh"
            value={logForm.fresh}
            // id={FormData.notes}
            onChange={handleChange}
            placeholder="Water Type"
        ></input>

        <br></br>
        <br></br>

        <label htmlFor="boat">Boat Dive(T/F): </label>
        <input
            type="boat"
            label="boat"
            name="boat"
            value={logForm.boat}
            // id={FormData.notes}
            onChange={handleChange}
            placeholder="Boat Dive"
        ></input>    

        <button type="submit">Add Log</button>

        </form>



        {/* <button onClick={clear}>Clear</button>
        <button onClick={save}>Save</button>
        <button onClick={show}>Show</button>
            <SignaturePad
                ref = {sigPad}
                canvasProps={{
                    className: 'signature'
                }}
            /> */}
        </div>
    )
}

export default AddDiveLog