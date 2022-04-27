
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

// TESTING SCROLL


// Internal Components
import Header from "./Header"
import MainFeed from "./MainFeed"
import AddDiveLog from "./AddDiveLog"
import ScrollTest from "./ScrollTest"




function App() {
  const [logs, setLogs] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:3000/logs")
      .then((response) => response.json())
      .then(logs => setLogs(logs));
      // .then(console.log)
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

