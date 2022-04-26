import React, { useRef } from 'react'
import SignaturePad from 'react-signature-canvas'

function AddDiveLog() {

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

    return (
        <div>Add Dive Log
        <button onClick={clear}>Clear</button>
        <button onClick={save}>Save</button>
        <button onClick={show}>Show</button>
            <SignaturePad
                ref = {sigPad}
                canvasProps={{
                    className: 'signature'
                }}
            />
        </div>
    )
}

export default AddDiveLog