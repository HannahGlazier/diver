import React, { useState } from "react";
import SignIn from "./SignIn";


function SignUp({ onLogin, onSignIn }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [certificationLevel, setCertificationLevel] = useState("");
    const [certificationDate, setCertificationDate] = useState("");
    const [homebase, setHomebase] = useState("");
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
            certificationLevel,
            certificationDate,
            homebase
        }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => onLogin(user));
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

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
            <label htmlFor="certificationLevel">Certification Level</label>
            <input
            type="text"
            id="certificationLevel"
            value={certificationLevel}
            onChange={(e) => setCertificationLevel(e.target.value)}
            />
        
            <br></br>
            <label htmlFor="certificationDate">Certification Date</label>
            <textarea
            rows="3"
            id="certificationDate"
            value={certificationDate}
            onChange={(e) => setCertificationDate(e.target.value)}
            />

            <br></br>
            <label htmlFor="homebase">Homebase</label>
            <textarea
            rows="3"
            id="homebase"
            value={homebase}
            onChange={(e) => setHomebase(e.target.value)}
            />
        
            <br></br>
            <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            <button onClick={() => setShowLogin(false)}>Take me back</button>
    
            {/* {errors.map((err) => (
            <Error key={err}>{err}</Error> */}
            {/* ))} */}
        
        </form>
        ) : (
            <SignIn onSignIn={onSignIn}/>
        )}
        </>
    );
    }

export default SignUp;