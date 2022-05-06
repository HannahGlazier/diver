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

    function fetchLogs(){
      fetch("/logs")
      .then((response) => response.json())
      .then(logs => setLogs(logs));
    }

  useEffect(() => {
    const getLogs = async () => {
      const res = await fetch("/logs?page=1")
      const data = await res.json()
      setLogs(data)
      console.log(data)
    }
    getLogs()
  }, [])


  const fetchLogsTEST = async () => {
    const res = await fetch(
      `/logs?page=${page}`
      // For json server use url below
      // `http://localhost:3004/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data;
  }; 

  const fetchData = async () => {
    const logsFormServer = await fetchLogsTEST();

    setLogs([...logs, ...logsFormServer]);
    if (logsFormServer.length === 0 || logsFormServer.length < 20) {
      sethasMore(false);
    }
    setpage(page + 1);
  };


    // Auto-Login
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {setUser(user)
          if (user.id) {
            fetchLogs()
          }
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
              fetchLogs={fetchLogs}
              fetchData={fetchData}
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