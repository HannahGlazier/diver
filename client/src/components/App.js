
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

// Internal Components
import Header from "./Header"
import MainFeed from "./MainFeed"
import AddDiveLog from "./AddDiveLog"
import SignIn from "./SignIn";

function App() {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/logs")
      .then((response) => response.json())
      .then(logs => setLogs(logs));
      // .then(console.log)
  }, []);


  // Auto-Login
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <SignIn onLogin={setUser} />;

  // Logout
  function handleLogoutClick() {
    fetch ("/logout", {method: "DELETE"}).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
      <div className="App">
        <Header />
        <button onClick={handleLogoutClick}>Logout</button>
        <Switch>
          <Route exact path="/">
            <MainFeed
              logs={logs}
            />
          </Route>
          <Route exact path="/add">
            <AddDiveLog />
          </Route>
        </Switch>
      </div>
  );
}

export default App;

// attach fetch to scroll
 // window.addEventListener('scroll', () => {

  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   console.log({ scrollTop, scrollHeight, clientHeight });
  

  //   if(clientHeight + scrollTop >= scrollHeight - 5) {
  //     console.log('at bottom of page')
  //     // showLoading()
  //     // fetch("http://localhost:3000/logs")
  //     // .then((response) => response.json())
  //     // .then(console.log);
  //     // .then(logs => setLogs(logs));
  //   }

  //   // Show loading 
  //   // showLoading()

  // })

  // function showLoading() {
  //   console.log('loading')

    
  
  //   fetch("http://localhost:3000/logs")
  //     .then((response) => response.json())
  //     .then(logs => setLogs(logs));
  //     // .then(console.log)


  //   console.log('done loading')

  // }
