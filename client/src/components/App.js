import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroll-component';


// Internal Components
import Header from "./Header"
// import MainFeed from "./MainFeed"
import LogContainer from "./LogContainer"
import AddDiveLog from "./AddDiveLog"
import AddSite from "./AddSite"
import SignIn from "./SignIn"
import Profile from "./Profile";
import EditDiveLog from "./EditDiveLog"
import SignUp from "./SignUp"

// MUI Imports
import { blue, orange, pink } from '@mui/material/colors';
import { createTheme } from "@mui/material";

function App() {
  const [logs, setLogs] = useState([]);
  const [sites, setSites] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([])
  const [filterBy, setFilterBy] = useState('explore');
  let history = useHistory();

  const [page, setpage] = useState(2);
  const [hasMore, sethasMore] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#f05545',
        main: '#b71c1c',
        dark: '#bdb9b9',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffffff',
        main: '#efebe9',
        dark: '#bdb9b7',
        contrastText: '#000',
      },
    },
});


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
      // console.log(logsFromServer.length)
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


  if (!user) return <SignIn setUser={setUser} theme={theme}/>;


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
    const newLogs = logs.map(log => log.id === updateLog.id ? updateLog : log)
    setLogs(newLogs)
  }

// Filters


const filterMap = user.followees.map(f => f.id) 

  // const filteredLogs =  logs.filter((logs) => {
  //   if (filterBy === "explore"){
  //     return logs
  //   } else if (filterBy === "following"){
  //     return filterMap.includes(logs.user.id)
  //   } else if (filterBy === "self") {
  //     return logs.user.id === user.id
  //   } 
  // })

function filteredLogs (){
    if (Array.isArray(logs)){
    
      return logs.filter((logs) => {
        if (filterBy === "explore"){
          return logs
        } else if (filterBy === "following"){
          return filterMap.includes(logs.user.id)
        } else if (filterBy === "self") {
          return logs.user.id === user.id
        }
        
    }) 
      
  } else {
    return []
  }
}




  return (
      <div className="App">
        <Header handleLogoutClick={handleLogoutClick} user={user} theme={theme}/>
        <Switch>
          <Route exact path="/">
            <LogContainer
              logs={filteredLogs()}
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
              theme={theme}
            />
          </Route>
          {/* <Route exact path="/signin">
              <SignIn />
          </Route>
          <Route exact path="/signup">
              <SignUp />
          </Route> */}
          <Route exact path="/addLog">
            <AddDiveLog 
              addNewLog={handleAddNewLog}
              user={user}
              setUser={setUser}
              sites={sites}
              logs={logs}
              setLogs={setLogs}
              theme={theme}
            />
          </Route>
          <Route exact path="/addSite">
            <AddSite
                addNewSite={handleAddNewSite}
                sites={sites}
                theme={theme}
              />
          </Route>
          <Route exact path="/profile">
            <Profile
              user={user}
              theme={theme}
              />
          </Route>
          <Route exact path="/editDiveLog">
              <EditDiveLog theme={theme}/>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
