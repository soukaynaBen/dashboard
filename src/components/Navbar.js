import React from 'react'
import { AppBar, CssBaseline, Divider, FormControl, Hidden, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge'
import {makeStyles} from '@material-ui/core/styles'
import  Box from '@material-ui/core/Box';
import  TextField  from '@material-ui/core/TextField';
import  Avatar  from '@material-ui/core/Avatar';
import { Grid} from '@material-ui/core'
import usePageViews from 'hooks/hooks'
import {grey} from '@material-ui/core/colors'
import { signOut } from "firebase/auth";
import {auth} from "firebaseConfig"
import {useSelector} from 'react-redux'
const useStyles=makeStyles((theme)=>({
root:{
    flexGrow: 1,
},
brand:{
    flexGrow:1,
},
appbar:{
    position: "absolute",
    top:theme.spacing(3),
    right: theme.spacing(3),
    left:`${theme.spacing(3)+255}px` ,
    zIndex:100,
    width:`calc(100% - ${theme.spacing(6) + 255}px)`,
    backgroundColor:theme.palette.background.paper,
    color:'#333',
    border:"none",
    boxShadow:"none",
     [theme.breakpoints.down('xs')]:{
    width:`calc(100% - ${theme.spacing(6) }px)`,
    left:`${theme.spacing(3)}px` ,
     },
},
toolbar:{
    display: 'flex',
    justifyContent:'space-between',
    '& > *':{
        margin:'0 5px',
    }
},
notification:{
    color: grey[500],
},
divider:{
    margin:' 10px',
}
}))


function Navbar() {
    const user=useSelector(state => state.user.user)
    const brand=usePageViews()[0];
    const classes=useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    
  };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.toolbar}>           
                    <Typography className={classes.brand}  variant="h5" >{brand}</Typography>
                        <Hidden smDown>
                            <Box component='form'>
                                <FormControl>
                                    <Grid container alignItems="center">
                                            <Grid item >
                                                <TextField id="standard-basic"  variant="standard" />
                                            </Grid>
                                            <Grid item>
                                                <IconButton type='submit'>
                                                    <SearchIcon/>
                                                </IconButton>
                                            </Grid>
                                            </Grid>
                                </FormControl>
                            </Box>
                        </Hidden>
                    <Badge  color="primary" badgeContent={4} max={99}>
                            <NotificationsIcon className={classes.notification}  />
                    </Badge>
                    
                  <Divider className={classes.divider}   orientation="vertical" variant="middle" flexItem />
                    <Hidden smDown>
                    <Typography variant="body2" >{user.displayName}</Typography>
                    </Hidden>
                    <IconButton>
                        <Avatar  
                         id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}  src={user.photoURL}>

                        <PersonIcon/>
                        </Avatar>                
                           </IconButton>
                  <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        style={{marginTop:60,marginLeft:20}}

      >
        <MenuItem             
        selected={0 === selectedIndex}
        onClick={(event) => handleMenuItemClick(event, 0)}>
            Profile
        </MenuItem>
        <MenuItem             
        selected={1 === selectedIndex}
        onClick={(event) => handleMenuItemClick(event, 1)}>
            My account
        </MenuItem>
        <MenuItem             
        selected={2 === selectedIndex}
        onClick={async (event) =>{signOut(auth)}
}>
            Logout
        </MenuItem>
      </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
