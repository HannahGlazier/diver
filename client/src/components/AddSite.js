import React, { useState } from 'react'
import AddDiveLog from './AddDiveLog'

function AddSite({ addNewLog, user, setUser, addNewSite }) {

    const initialSiteForm = {
        name: "",
        location: "",
        lat: "", 
        long: ""
    }

    const [siteForm, setSiteForm] = useState(initialSiteForm)
    const [siteState, setSiteState] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSiteForm(siteForm => ({...siteForm, [name]: value}))
    }

    function handleSubmit(e) {
        e.stopPropagation()
        e.preventDefault(e)

        const newSite = {
            name: siteForm.name,
            location: siteForm.location, 
            lat: siteForm.lat, 
            long: siteForm.long
        }

        fetch("http://localhost:3000/sites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(newSite)
        })
        .then(response => response.json())
        // .then(site => addNewSite(site))
        .then(console.log())
        .then(setSiteForm(initialSiteForm))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Dive Site Name: </label>
                <input
                    type="text"
                    label="name"
                    name="name"
                    value={siteForm.name}
                    onChange={handleChange}
                    placeholder="Dive Site Name"
                ></input> 

                <br></br>
                <br></br>

                <label htmlFor="location">Location: </label>
                <input
                    type="text"
                    label="location"
                    name="location"
                    value={siteForm.location}
                    onChange={handleChange}
                    placeholder="Location"
                ></input> 

                <br></br>
                <br></br>

                <label htmlFor="lat">Latitude: </label>
                <input
                    type="text"
                    label="lat"
                    name="lat"
                    value={siteForm.lat}
                    onChange={handleChange}
                    placeholder="Latitude"
                ></input> 

                <br></br>
                <br></br>

                <label htmlFor="long">Longitude: </label>
                <input
                    type="text"
                    label="long"
                    name="long"
                    value={siteForm.long}
                    onChange={handleChange}
                    placeholder="Longitude"
                ></input> 

                <button type="submit">Add Log</button>

            </form>
            <AddDiveLog
                addNewLog={addNewLog}
                user={user}
                setUser={setUser}
                siteState={siteState}
            />
        </div>
    )
}

export default AddSite