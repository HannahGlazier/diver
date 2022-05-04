import React, { useState } from "react";
import SignIn from "./SignIn";


function SignUp({ onLogin, onSignIn, setUser }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [certification_level, setCertificationLevel] = useState("");
    const [certification_date, setCertificationDate] = useState("");
    const [homebase, setHomebase] = useState("");
    const [icon, setIcon] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true)

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            password,
            password_confirmation: passwordConfirmation,
            certification_level,
            certification_date,
            homebase, 
            icon
        }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => setUser(user));
        } else {
            r.json().then(err => window.alert(err.errors))
        }
        });
    }
console.log(icon)
    return (
        <>
        { showLogin ? (
        <form 
        className="signup"
        onSubmit={handleSubmit}
        >
    
            <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        
            <br></br>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            />
        
            <br></br>
            <label htmlFor="password">Password Confirmation</label>
            <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
            />
            <br></br>

            <label htmlFor="icon">Choose an Icon: </label>
            <select 
                id="icon"
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
            >
                <option value="https://img.icons8.com/color/96/000000/clown-fish.png">Clown Fish</option>
                <option value="https://img.icons8.com/color/96/000000/fish.png">Angel Fish</option>
                <option value="https://img.icons8.com/color/96/000000/big-eats-small.png">Big eats small fish</option>
                <option value="https://img.icons8.com/emoji/96/000000/blow-fish.png">Blow Fish</option>
                <option value="https://img.icons8.com/fluency/96/000000/perch.png">Perch</option>
            </select> 
        
        
            <br></br>
            <label htmlFor="certification_level">Certification Level</label>
            <input
            type="text"
            id="certification_level"
            value={certification_level}
            onChange={(e) => setCertificationLevel(e.target.value)}
            />
        
            <br></br>
            <label htmlFor="certification_date">Certification Date</label>
            <input
            type="date"
            label="date"
            // id="certificationDate"
            value={certification_date}
            onChange={(e) => setCertificationDate(e.target.value)}
            ></input>

            <br></br>
            <label htmlFor="homebase">Homebase</label>
            <input
            type="text"
            id="homebase"
            value={homebase}
            onChange={(e) => setHomebase(e.target.value)}
            ></input>
        
            <br></br>
            <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            <button onClick={() => setShowLogin(false)}>Take me back</button>
    
            {/* {errors.map((err) => (
            <Error key={err}>{err}</Error> */}
            {/* ))} */}
        
        </form>
        ) : (
            <SignIn setUser={setUser}/>
        )}
        </>
    );
    }

export default SignUp;