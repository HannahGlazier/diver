// client/src/components/App.js
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";

// Internal Components
import AddDiveLog from "./AddDiveLog"
import Header from "./Header"

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <h1>Page Count: {count}</h1>
          </Route>
          <Route exact path="/add">
            <AddDiveLog />
          </Route>
        </Switch>
      </div>
  );
}

export default App;
