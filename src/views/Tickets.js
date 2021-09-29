import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import {customerData} from 'variables/variables'
import {grey} from '@material-ui/core/colors'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/core/styles';
const useStyles = makeStyles({
 
 table:{
    minWidth: 650,
 },
 container:{
   paddingBottom:150
   }
 
});

const EnhancedTableContainer=styled(TableContainer)({
  "&":{
     overflowX: "scroll",
    "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
    },
    "&::-webkit-scrollbar-track": {
        boxShadow: "nset 0 0 6px grey",
        borderRadius: "5px"
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#acadaf",
        borderRadius: "15px",
        height: "2px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "#ccc",
        maxHeight: "10px"
    },
    "&::-webkit-scrollbar-button:vertical:start:decrement": {
       
        display: "block",
        backgroundSize: "10px"
    },
    "&::-webkit-scrollbar-button:vertical:end:increment": {
        display: "block",
        backgroundSize: "10px"
    },
    }
})


const  Customerdetails=({details=null, name=null, date=null, priority=null})=>{
    
  return (
   <>
  { details && 
    <Grid container alignItems='center'>
      <Grid  item >
        <Avatar src={details.img} style={{marginRight:'10px'}}>
        </Avatar>
      </Grid>
      <Grid xs item >
        <Typography variant="subtitle1" style={{fontWeight:500}}>{details.subject}</Typography>
        <Typography variant="caption" style={{color:grey[500]}}>{details.update}</Typography>
      </Grid>
    </Grid>}

{name && <Box component='div'>
  <Typography variant="body2" style={{fontWeight:500}}>{name.name}</Typography>
  <Typography variant="caption" style={{color:grey[500]}}>{name.date}</Typography>
</Box>
 }
{date && <Box component='div'>
  <Typography variant="body2" style={{fontWeight:500}}>{date.year}</Typography>
  <Typography variant="caption" style={{color:grey[500]}}>{date.time}</Typography>
</Box>
 }
 {priority && <Chip label={priority.label} color={priority.color} /> }
</>)
}

Customerdetails.propTypes = {
  details: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  priority: PropTypes.object.isRequired,
 
};

export default function Tickets() {
  const classes = useStyles();
  
  return (
    <div className={classes.container} >
 
    <EnhancedTableContainer  component={Paper}>
      <Table  className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticket details</TableCell>
            <TableCell align="right">Customer name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerData.map(({details, name, date, priority},key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                <Customerdetails details={details}/>
              </TableCell>
              <TableCell align="right"><Customerdetails name={name}/> </TableCell>
              <TableCell align="right"><Customerdetails date={date}/></TableCell>
              <TableCell align="right"><Customerdetails priority={priority}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </EnhancedTableContainer>
     </div>
      );
}
