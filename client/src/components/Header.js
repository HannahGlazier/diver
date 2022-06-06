
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { useHistory } from 'react-router-dom';

// MUI imports
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem, Avatar, Container, ThemeProvider} from '@mui/material';

function Header({user, handleLogoutClick, theme}) {

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

  return (
    <ThemeProvider theme={theme}>
    <AppBar  position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img id="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIH0WAJUpyIQpNNE1gwXHwH5t9fx9L6LRSA&usqp=CAU" alt="dive flag logo"/>
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
                <MenuItem key="log" onClick={handleCloseNavMenuLog}>
                <Typography textAlign="center">Add Dive Log</Typography>
                </MenuItem>
                <MenuItem key="site" onClick={handleCloseNavMenuSite}>
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
                sx={{ color: 'white', display: { xs: 'none', md: 'flex' } }}
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
                <Typography sx={{color: 'white'}}>Welcome, {user.name}!</Typography>
                <Avatar alt={user.name} src={user.icon} />
              </IconButton>
            </Tooltip>
            <Typography
            variant="p"
            noWrap
            component="div"
            id = "header_font"
          >
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
    </ThemeProvider>
  );
};

export default Header;