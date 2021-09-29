
import {makeStyles,styled} from '@material-ui/core/styles'
import routes from 'routes'
import {useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import { Avatar, Grid, ListItemText, ListItemIcon, List,ListItem } from '@material-ui/core';
import {grey} from '@material-ui/core/colors'
import {useHistory} from 'react-router'
import usePageViews from 'hooks/hooks'
const useStyles=makeStyles((theme)=>({
 drawer:{
     backgroundColor:"#363740",
     color: grey[300],
     width:255,
     position: "fixed",
     left:0,
     bottom:0,
     top:0,
     [theme.breakpoints.down('xs')]:{
     display :'none',
     },
     padding: theme.spacing(3,0),
     "&:hover":{
         color:grey[100],
     }
 },
 brand:{
     padding:theme.spacing(2),
     marginBottom:theme.spacing(4),
 },
 
}))

const ListItemLink=styled(ListItem)(({theme})=>({
    '&.Mui-selected,&.Mui-selected:hover':{
        borderLeft:'5px solid #fff',
        backgroundColor:grey[700],
         '& .MuiListItemIcon-root':{
            color:grey[100],
        },
        '& .MuiListItemText-root':{
        color:grey[100],
        }
    },
    '&:not(.Mui-selected):hover':{
        backgroundColor:grey[800],
        '& .MuiListItemIcon-root':{
            color:grey[100],
        },
        '& .MuiListItemText-root':{
        color:grey[100],
        }
    },
    '& .MuiListItemIcon-root':{
        color:grey[400],
    },
    '& .MuiListItemText-root':{
        color:grey[400],
    }
}));
function Sidebar() {
    const listKey=usePageViews()[1];
   
    const classes=useStyles();
    const [selectedIndex, setSelectedIndex] = useState(listKey);
          
    const history=useHistory();
  const handleListItemClick = (event, index,path) => {
    setSelectedIndex(index);
            history.push(path)
  };
  useEffect(() => {
      setSelectedIndex(listKey)
     
  }, [listKey])
    return (
        <div className={classes.drawer}>
            <Grid className={classes.brand} container alignItems="center" spacing={1} >
                <Grid item >
            <Avatar color='primary'>D</Avatar> 
                
                </Grid>
                <Grid item >
            <Typography  variant="h5" component='h1' color="initial">
                Dashboard Kit
            </Typography>
                
                </Grid>
            </Grid>

            <List component="nav"
      aria-labelledby="nested-list">
                {
                    routes.map(({path,layout,icon,name},key)=>(
                <ListItemLink  
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key,layout+path)}
                button 
                > 
                    <ListItemIcon >{icon}</ListItemIcon>
                     <ListItemText  primary={name}/>
                    </ListItemLink>
                    ))
                }
            </List>
             
        </div>
    )
}

export default Sidebar
