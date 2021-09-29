import { makeStyles, Paper, styled, Typography, Box, Grid, Divider, ListItemText,ListItemIcon, List, ListItem, IconButton, Checkbox, Chip, Hidden } from '@material-ui/core';
import {grey} from  '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from "variables/variables"
import {format} from 'date-fns'
const useStyles=makeStyles((theme)=>({
root:{
    backgroundColor:'#F7F8FC',
    minHeight:'100%',
},
container:{
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'row',
    flexWrap: "wrap",

},
item:{
    flex:"0 1 25%",
    display:'flex',
    paddingBottom:'15px',
    justifyContent:'flex-start',
     '&:not(:first-of-type)':{
         paddingLeft:"15px",
     },
    [theme.breakpoints.down("sm")]:{
    flex:"0 1 50%",
     '&:not(:first-of-type)':{
         paddingLeft:"0px",
     },
    "&:nth-of-type(2n)":{
    justifyContent:'flex-end',
         paddingLeft:"10px",
    }
    },
      [theme.breakpoints.down("xs")]:{
   
    "&:nth-of-type(2n)":{
         paddingLeft:"5px",
    },
    },
},
   chart:{
       marginTop:`${theme.spacing(5)}px`,
   } ,
   details:{
       marginTop:`${theme.spacing(4)}px`,

   }


}))

const Item=styled(({primaryText,secondaryText,...other})=>(
<ListItemText  primary={primaryText}
                      secondary={
                           <>
                <Typography
                    component="span"
                    variant="h5"
                >
                   {secondaryText}
                </Typography>
                </>
                      }
                      {...other}/>
))(({theme})=>({
    '&':{
        padding: theme.spacing(1),
    },
   '& .MuiTypography-root.MuiTypography-displayBlock':{
       textAlign:'center',
   '&.MuiListItemText-primary':{
       color:grey[500],
   },
   '&.MuiListItemText-secondary':{
       color:theme.palette.common.black,
   } ,
   },
   
})) 


const RoundedCard=styled(({title,count,...other})=>(
    <Paper {...other}>
        <Typography variant="subtitle1">
           {title}
        </Typography>
        <Typography component='span' variant="h4">
           {count}
        </Typography>
    </Paper>
))(({theme})=>({
   '&':{
       border:"1px solid transparent",
        flex:1,
        maxWidth: '258px',
        minWidth: '130px',
        width: 'auto',
        padding: theme.spacing(3,1),
        borderRadius:15,
        textAlign:'center',
        
        [theme.breakpoints.down("xs")]:{
        padding: theme.spacing(2),
            
        minWidth: '100px',
        },
   },
   '& .MuiTypography-subtitle1':{
       color:grey[500],
   },
   '& .MuiTypography-h4':{
       fontWeight:700,
   },
   '&:hover':{
       borderColor:"#3751FF",
       "& .MuiTypography-h4":{
       color:"#3751FF",
       },
        '& .MuiTypography-subtitle1':{
        color:"#3751FF",
       },
   }
})) 

function Overview() {
   const classes=useStyles();
    return (
        <div className={classes.root}>
              <Box   className={classes.container}>
                    <Box   className={classes.item}>       
                        <RoundedCard  title='Unresolved' count='60'/>   
                    </Box>
                    <Box  className={classes.item}>
                        <RoundedCard  title='Overdue' count='16'/>   
                    </Box>
                    <Box       className={classes.item}>
                        <RoundedCard  title='Open' count='43'/>   
                    </Box>
                    <Box   className={classes.item}>
                        <RoundedCard  title='On hold' count='64'/>     
                    </Box>         
               </Box> 
             <Box className={classes.chart}>
                <Paper >
                <Grid container >   
                    <Grid xs={12} md={8} style={{padding:"15px"}}    item >
                          <Typography variant="subtitle2" >Today’s trends</Typography>
                          <Typography variant="caption" style={{color:grey[500]}}>
                            {format(new Date(), "'as of 'dd MMM yyyy',' p")}</Typography>
                      <ResponsiveContainer  width="100%" height={380}>
                          <LineChart data={data} margin={{ top: 5, right: -25, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="value" />
                            <YAxis orientation='right' />
                            <Tooltip />
                            <Legend verticalAlign="top" height={30}/>
                            <Line strokeWidth={1.5} dot={{ strokeWidth:4 }} type="monotone" dataKey="today" stroke="#8884d8" />
                            <Line strokeWidth={1.5} dot={{ strokeWidth:4 }} type="monotone" dataKey="yesterday" stroke="#82ca9d" />
                            </LineChart>
                      </ResponsiveContainer>

                   </Grid>
                  <Hidden smDown>  <Divider orientation='vertical' flexItem/>
                  </Hidden>  
                    <Grid xs item>
                     <List>             
                      <Item primaryText="Resolved" secondaryText="56"/>
                      <Divider/>
                      <Item primaryText="Received" secondaryText="426"/>
                      <Divider/>
                      <Item primaryText="Average first response time" secondaryText="33m"/>
                      <Divider/>
                      <Item primaryText="Average response time" secondaryText="3h 8m"/>
                      <Divider/>
                      <Item primaryText="Resolution within SLA" secondaryText="94%"/>
                     </List>
                    </Grid>
                </Grid>
                </Paper>
             </Box>
            <Box className={classes.details}>
            </Box>
             <Grid container spacing={2}>
                <Grid xs={12} md={6} item >
                  <Paper>
                      <List>             
                      <ListItem >
                           <Grid container justifyContent='space-between' alignItems='center'>
                          <ListItemText flexGrow 
                          primary={<>
                          <Typography variant="h5">Unresolved tickets</Typography>
                          </>} 
                           secondary={<>
                          <Typography variant="body2">Group:<strong> Support </strong></Typography>
                          </>} />
                            <Typography variant="body2" color='primary'>View details</Typography>
                        </Grid>
                      </ListItem >
                      <Divider/>
                      <ListItem style={{padding:"15px "}}>
                          <Grid container >
                                <Grid xs item >
                                    <Typography variant="body2">Awaiting Customer Request</Typography>
                                </Grid>
                                <Grid xs={1} item >
                                    <Typography variant="body2" style={{color:grey[500]}}>4221</Typography>
                                </Grid>
                            </Grid>
                      </ListItem >  
                       <Divider/>

                      <ListItem style={{padding:"15px "}}>
                          <Grid container >
                                <Grid xs item >
                                    <Typography variant="body2">Awaiting Customer Response</Typography>
                                </Grid>
                                <Grid xs={1} item >
                                    <Typography variant="body2" style={{color:grey[500]}}>221</Typography>
                                </Grid>
                            </Grid>
                      </ListItem >
                      <Divider/>
                      <ListItem style={{padding:"15px "}}>
                                <Grid container >
                                <Grid xs item >
                                    <Typography variant="body2">Awaiting Developer Fix</Typography>
                                </Grid>
                                <Grid xs={1} item >
                                    <Typography variant="body2" style={{color:grey[500]}}>558</Typography>
                                </Grid>
                            </Grid>
                     
                      </ListItem >
                      <Divider/>
                      <ListItem style={{padding:"15px "}}>
                                <Grid container >
                                <Grid xs item >
                                    <Typography variant="body2">Pending</Typography>
                                </Grid>
                                <Grid xs={1} item >
                                    <Typography variant="body2" style={{color:grey[500]}}>48</Typography>
                                </Grid>
                            </Grid>
                     
                      </ListItem >
                     </List>
                   
                  </Paper>
                </Grid>
                <Grid xs={12} md={6} item >
                           <Paper>
                      <List >             
                      <ListItem >
                           <Grid container justifyContent='space-between' alignItems='center'>
                          <ListItemText flexGrow 
                          primary={<>
                          <Typography variant="h5">Tasks</Typography>
                          </>} 
                           secondary={<>
                          <Typography variant="body2">Today</Typography>
                          </>} />
                            <Typography variant="body2" color='primary'>View all</Typography>
                        </Grid>
                      </ListItem >
                      <ListItem >
                          <Grid container justifyContent='space-between' alignItems='center' style={{color:grey[500]}}>
                                    <Typography variant="body2" >Create new task</Typography>
                                     <IconButton aria-label="add task" >
                                       <AddIcon />
                                     </IconButton>
                            </Grid>
                      </ListItem >  
                      <Divider/>
                        <ListItem  role={undefined} dense  >
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                color='primary'
                                icon={ <RadioButtonUncheckedIcon/>}
                                checkedIcon={ <CheckCircleIcon/>}

                            />
                            </ListItemIcon>
                            <ListItemText  primary="Finish ticket update" />
                            <Chip size="small"   color='secondary' label="Urgent" />

                         </ListItem>
                      <Divider/>
                     <ListItem  role={undefined} dense  >
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                color='primary'
                                defaultChecked
                                icon={ <RadioButtonUncheckedIcon/>}
                                checkedIcon={ <CheckCircleIcon/>}

                            />
                            </ListItemIcon>
                            <ListItemText  primary="Finish ticket update" />
                               <Chip size="small"     color='primary' label="New" />
                             </ListItem>
                          <Divider/>
                          <ListItem  role={undefined} dense  >
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                color='primary'
                                icon={ <RadioButtonUncheckedIcon/>}
                                checkedIcon={ <CheckCircleIcon/>}

                            />
                            </ListItemIcon>
                            <ListItemText  primary="Finish ticket update" />
                            
                            <Chip size="small"   color='default' label="Default" />

                         </ListItem>
                         </List>
                   
                  </Paper>
                
                </Grid>
             </Grid>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>







        
        </div>
    )
}

export default Overview
