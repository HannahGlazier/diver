import React, { useState } from "react";
import SignUp from './SignUp'


function SignIn({ onLogin, onSignIn }) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
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
        {showLogin ? (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Username</label>
            <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        
    
            <button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
            </button>
        
        {/* <form>
            {errors.map((err) => (
            <error key={err}>{err}</error>
            ))}
        </form> */}
        <button onClick={() => setShowLogin(false)}>Don't have an account? Sign Up</button>
        </form>
        ) : (
        <SignUp onSignIn={onSignIn} />
        )}
        </>
    );
}

export default SignIn;