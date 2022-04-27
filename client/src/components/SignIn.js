import React, { useState } from "react";


function SignIn({ onLogin }) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        </form>
    );
}

export default SignIn;