import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroll-component';

// Internal Components
import Header from "./Header"
import MainFeed from "./MainFeed"
import AddDiveLog from "./AddDiveLog"
import AddSite from "./AddSite"
import SignIn from "./SignIn"
import Profile from "./Profile";
import EditDiveLog from "./EditDiveLog"



function App() {
  const [logs, setLogs] = useState([]);
  const [sites, setSites] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([])
  const [filterBy, setFilterBy] = useState('explore');
  let history = useHistory();

  const [page, setpage] = useState(2);
  const [hasMore, sethasMore] = useState(true);


   // Fetches

    // function fetchLogs(){
    //   fetch("/logs")
    //   .then((response) => response.json())
    //   .then(logs => setLogs(logs));
    // }

  useEffect(() => {
    const getLogs = async () => {
      const res = await fetch("/logs?page=1")
      const data = await res.json()
      setLogs(data)
    }
    getLogs()
  }, [])


  const fetchLogsScroll = async () => {
    const res = await fetch(
      `/logs?page=${page}`
    );
    const data = await res.json();
    return data;
  }; 

  const fetchData = async () => {
    const logsFromServer = await fetchLogsScroll();

    setLogs([...logs, ...logsFromServer]);
    if (logsFromServer.length === 0 ) {
      console.log(logsFromServer.length)
      sethasMore(false);
    }
    setpage(page + 1);
  };


  //   // Auto-Login
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {setUser(user)
          // if (user.id) {
          //   fetchLogs()
        
          // }
        });   
      } 
    });
  }, []);


  if (!user) return <SignIn setUser={setUser} />;


  // Logout
  function handleLogoutClick() {
    fetch ("/logout", {method: "DELETE"}).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  function handleDeleteLog(log){
    fetch(`/logs/${log.id}`, { method: 'DELETE' })
    console.log(log)
    const newLogs = logs.filter( indivdualLog => indivdualLog !== log)
    setLogs(newLogs)
  }

  // State handlers

  function handleAddNewLog(newLog){
    setLogs([...logs, newLog])
  }

  function handleAddNewSite(newSite){
    setSites([...sites, newSite])
  }

  function handleFollowState(newFollow){
    setFollowing([following, ...newFollow]);   
}

// Update Log
  function handleUpdateLog(updateLog){
    console.log("updating log", updateLog)
    // logs.filter(log.id === updateLog.id )
    setLogs([...logs, updateLog])
  }

// Filters


const filterMap = user.followees.map(f => f.id) 

  const filteredLogs = logs.filter((logs) => {
    if (filterBy === "explore"){
      return logs
    } else if (filterBy === "following"){
      return filterMap.includes(logs.user.id)
    } else if (filterBy === "self") {
      return logs.user.id === user.id
    } 
  })


  return (
      <div className="App">
        <Header handleLogoutClick={handleLogoutClick} user={user}/>
        <Switch>
          <Route exact path="/">
            <MainFeed
              logs={filteredLogs}
              handleDeleteLog={handleDeleteLog}
              user={user}
              following={following}
              handleFollowState={handleFollowState}
              setFollowing={setFollowing}
              setFilterBy={setFilterBy}
              onFollow={setUser}
              // fetchLogs={fetchLogs}
              fetchData={fetchData}
              hasMore={hasMore}
              onUpdateLog={handleUpdateLog}
              // logs={logs}
              setLogs={setLogs}
            />
          </Route>
          <Route exact path="/addLog">
            <AddDiveLog 
              addNewLog={handleAddNewLog}
              user={user}
              setUser={setUser}
              sites={sites}
              logs={logs}
              setLogs={setLogs}
            />
          </Route>
          <Route exact path="/addSite">
            <AddSite
                addNewSite={handleAddNewSite}
                sites={sites}
              />
          </Route>
          <Route exact path="/profile">
            <Profile
              user={user}
              />
          </Route>
          <Route exact path="/editDiveLog">
              <EditDiveLog/>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
