import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginUserDetails, getPublicBlogs, getSearchBlogs, searchValue, userLogout } from '../actions';
import Cookies from 'js-cookie'
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  console.log(search, "search");
  const loginStatus = useSelector(state => state.blogUserReducer.loginStatus)
  const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
  const cookie = Cookies.get('jwt')

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    console.log("e.target.value", e.target.value);

    setAnchorElUser(null);
  };
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  const classes = useStyles();
  const logout = () => {
    dispatch(userLogout())
  }
  useEffect(() => {
    dispatch(getPublicBlogs(search))

    dispatch(getLoginUserDetails())
  }, [])

  useEffect(() => {
    dispatch(searchValue(search))
  }, [search])
  const onchangeChandler = event => {
    setSearch(event.target.value)
  }
  const debouncedOnChange = debounce(onchangeChandler, 500)
  return (
    <>
      <Switch>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                MyNFT.com
              </Typography>

              <div className='NavBarButtons'>
                <div className='navButton'>
                  <NavLink to='/myBlogs'><Button variant="contained" className='MyArticals' color='success'>HOME</Button></NavLink>

                </div>
                <div className='navButton'>
                  <NavLink to='/articals'><Button variant="contained" className='MyArticals' color='success'>ARTISTS</Button></NavLink>
                </div>
                <div className='navButton'>
                  <NavLink to='/articals'><Button variant="contained" className='MyArticals' color='success'>GENRES</Button></NavLink>
                </div>
              </div>
              <div className={classes.grow} />

              {
                loginStatus === false ? (
                  <>
                    <div className='loginName'>
                      <h3 >WELCOME {loginAuthenticateUser || loginStatus === false ? `${loginAuthenticateUser.userName}` : null}</h3>
                      <h4>{loginAuthenticateUser || loginStatus === false ? `You are signed in as ${loginAuthenticateUser.email}` : null}</h4>
                    </div>
                  </>) : null
              }
              <div className='loginAuthenticateUserprofilePhoto'>
                {
                  loginStatus === false ? <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" id="profileImg" src={loginAuthenticateUser.profilePhoto ? loginAuthenticateUser.profilePhoto : "/static/images/avatar/2.jpg"} />
                      </IconButton>
                    </Tooltip>
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
                      onClose={handleCloseUserMenu}
                    >

                      <MenuItem onClick={handleCloseUserMenu}>
                        <div className='menu'>
                          <Typography textAlign="center" >Dashboard</Typography>
                          <Typography textAlign="center" >Artists</Typography>
                          <Typography textAlign="center" >Genres</Typography>
                          <NavLink to="/profile"><Typography textAlign="center" >Profile</Typography></NavLink>
                          <NavLink to="/changepwd"><Typography textAlign="center" >Change Password</Typography></NavLink>
                          <Typography textAlign="center" onClick={logout}>Logout</Typography>
                        </div>
                      </MenuItem>

                    </Menu>
                  </Box> : null
                }
              </div>

              {
                loginStatus === false ? null
                  : (
                    <>
                      <NavLink to='/signup'><Button variant="contained" >SIGN UP</Button></NavLink>

                      <NavLink to='/signin'><Button variant="contained" >Sign in</Button></NavLink>
                    </>
                  )

              }



              <div className={classes.sectionMobile}>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </Switch>
    </>

  );
}

export default Navbar