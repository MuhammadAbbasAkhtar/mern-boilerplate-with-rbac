import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import * as auth from '../../helpers/UserAuth'
import decodeToken from '../../helpers/decodeToken';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme, props) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        zIndex:1,
        [theme.breakpoints.up('sm')]: {
            width: props =>  `calc(100% - ${props.drawerWidth-1}px)`,
            marginLeft: props => props.drawerWidth,
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
    pageTitle:{
        textTransform: 'capitalize',
        flexGrow: 1,
    }
}));
export default function InfoBar(props) {
    const classes = useStyles(props);
    const [userData, setUserData] = useState({})
    const [openMenu, setOpenMenu] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleMenu = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };
    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpenMenu(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpenMenu(false);
        }
    }
    const prevOpen = useRef(openMenu);
    useEffect(() => {
        if (prevOpen.current === true && openMenu === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = openMenu;
    }, [openMenu]);

    useEffect(()=> {
        const user = decodeToken()
        setUserData({
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email
        })
    }, [])
    
    return (
        <AppBar position="fixed" className={classes.appBar} elevation={0} >
            <Toolbar>
                <IconButton 
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.pageTitle}>
                   {props.pageTitle}
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleToggleMenu}
                    color="inherit"
                    disableRipple={true}
                    ref={anchorRef}
                >
                    <>
                        <Typography variant="subtitle2" display="block" >{userData.firstName} {userData.lastName}</Typography>
                        <KeyboardArrowDownRoundedIcon />
                    </>
                </IconButton>
                <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseMenu}>
                            <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {/* <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseMenu}>My account</MenuItem> */}
                                <MenuItem disabled>
                                    <Typography variant="caption">
                                        {userData.email}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={auth.logOut}>Logout</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                {/* <Button
                    type="button"
                    color="inherit"
                    onClick={auth.logOut}
                    elevation={5}
                >
                    Log out
                </Button> */}
            </Toolbar>
        </AppBar>
    )
}