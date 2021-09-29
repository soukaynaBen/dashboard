import routes from 'routes'
import { Redirect, Route , Switch } from "react-router";
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { Box, CssBaseline, makeStyles } from '@material-ui/core';

const switchRoutes=()=>(
     <Switch>
         {
    routes.map(({path,layout,component,name})=>(   
        <Route exact path={layout+path} component={component} key={name}/> 
    ))
         }
         <Redirect from="/admin" to="/admin/overview"/>
     </Switch>
)
const useStyles=makeStyles((theme)=>({
root:{
    backgroundColor:'#F7F8FC',
    minHeight:'100%',
},
content:{
    position:'relative',
    left:`${theme.spacing(3)+255}px` ,
    right:theme.spacing(3),
    width:`calc(100% - ${theme.spacing(6) + 255}px)`,
    paddingTop:theme.spacing(18),

    [theme.breakpoints.down('xs')]:{
        left:`${theme.spacing(3)}px` ,
        width:`calc(100% - ${theme.spacing(6)}px)`,
     },
}


}))

function Admin() {
    const classes=useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Navbar/>
            <Sidebar/>
             <Box  component='div'className={classes.content} >
             {switchRoutes()}
             </Box>
        </div>
    )
}

export default Admin
