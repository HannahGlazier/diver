// client/src/components/App.js
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";

// Internal Components
import Header from "./Header"
import MainFeed from "./MainFeed"
import AddDiveLog from "./AddDiveLog"


function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/logs")
      .then((response) => response.json())
      .then(logs => setLogs(logs));
  }, []);

  return (
      <div className="App">
        <Header />
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
