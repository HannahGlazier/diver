
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { useHistory } from 'react-router-dom';
// MUI imports
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem, Avatar, Container } from '@mui/material';

function Header({user, setUser, handleLogoutClick}) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenuHome = () => {
    setAnchorElNav(null);
    history.push("/")
  };

  const handleCloseNavMenuLog = () => {
    setAnchorElNav(null);
    history.push("/addLog")
  };

  const handleCloseNavMenuSite = () => {
    setAnchorElNav(null);
    history.push("/addSite")
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenuProfile= () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenuProfilePage = () => {
    setAnchorElUser(null);
    history.push("/profile")
  };

  // function handleLogoutClick() {
  //   fetch ("/logout", {method: "DELETE"}).then((r) => {
  //     if (r.ok) {
  //       setUser(null);
  //     }
  //   });
  // }

  return (
    <AppBar  position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img id="logo" src={require ('')} alt="logo"/> */}
          <Typography
            variant="h3"
            noWrap
            id= "header_font"
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Diver
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem key="home" onClick={handleCloseNavMenuHome}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key="activity" onClick={handleCloseNavMenuLog}>
                <Typography textAlign="center">Add Dive Log</Typography>
                </MenuItem>
                <MenuItem key="activity" onClick={handleCloseNavMenuSite}>
                <Typography textAlign="center">Add Dive Site</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="div"
            id= "header_font"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Diver
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="home"
                onClick={handleCloseNavMenuHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Home
              </Button>
              <Button
              key="addActivity"
              onClick={handleCloseNavMenuLog}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Add Dive Log
            </Button>
            <Button
                key="addSite"
                onClick={handleCloseNavMenuSite}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Add Dive Site
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography>{user.name}</Typography>
                <Avatar alt={user.name} src={user.icon} />
              </IconButton>
            </Tooltip>
            <Typography
            variant="p"
            noWrap
            component="div"
            id = "header_font"
          >
            {/* Welcome {user.username}! */}
          </Typography>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenuProfile}
            >
                <MenuItem key="profile" onClick={handleCloseUserMenuProfilePage}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogoutClick}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;







// import React from 'react'
// import { NavLink } from "react-router-dom";

// function Header({ handleLogoutClick }) {
//   return (
//     <div >
//       <div className="ui secondary pointing menu">
//         <NavLink to="/" className="item">
//           Home
//         </NavLink>
//         <NavLink to="/addLog" className="item">
//           Add Dive Log
//         </NavLink>
//         <NavLink to="/addSite" className="item">
//           Add Dive Site
//         </NavLink>
//         <NavLink to="/profile" className="item">
//           Profile
//         </NavLink>
//         <div className="right menu">
//           <button 
//             className="ui item"
//             onClick={handleLogoutClick}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//       <div className="ui segment">
//         <p></p>
//       </div>
//     </div>
//   )
// }

// export default Header

// import React from 'react'
// import { NavLink } from "react-router-dom";

// function Header() {
//   return (
//     <div className="header">Header
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/addLog">Add Dive Log</NavLink>
//       <NavLink to="/addSite">Add Dive Site</NavLink>
//       <NavLink to="/profile">Profile Page</NavLink>
//     </div>
//   )
// }

// export default Header