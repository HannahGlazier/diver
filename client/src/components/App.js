
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
  let history = useHistory();

    // Fetches
    // useEffect(() => {
    //   fetch("/logs")
    //     .then((response) => response.json())
    //     .then(logs => setLogs(logs));
    //     // .then(console.log)
    // }, [user]);

    function fetchLogs(){
      fetch("/logs")
      .then((response) => response.json())
      .then(logs => setLogs(logs));
    }

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

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => {setUser(user)
  //       });   
  //     } 
  //   });
  // }, []);

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

  function handleAddNewLog(newLog){
    setLogs([...logs, newLog])
  }

  function handleAddNewSite(newSite){
    setSites([...sites, newSite])
  }

  function handleFollowState(newFollow){
    setFollowing([following, ...newFollow]);   
}

// function handleUnfollow(user){
//   // fetch(`http://localhost:3000/follows/${log.user.id}`, {method: 'DELETE'})
//   console.log(user)
//   // const newFollows = following.filter(individualFollow => individualFollow !== user.follow.id)
//   // setFollowing(newFollows)

// }


  return (
      <div className="App">
        <Header handleLogoutClick={handleLogoutClick} user={user}/>
        {/* <button onClick={handleLogoutClick}>Logout</button> */}
        <Switch>
          <Route exact path="/">
            <MainFeed
              logs={logs}
              handleDeleteLog={handleDeleteLog}
              user={user}
              following={following}
              handleFollowState={handleFollowState}
              setFollowing={setFollowing}

              onFollow={setUser}
// =======
//               setUser={setUser}
// >>>>>>> main
              // handleUnfollow={handleUnfollow}
            />
          </Route>
          <Route exact path="/addLog">
            <AddDiveLog 
              // addNewSite={handleAddNewSite}
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
                // addNewLog={handleAddNewLog}
                // user={user}
                // setUser={setUser}
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
