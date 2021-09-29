import { alpha, styled,makeStyles } from '@material-ui/core/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';


export  const useStyles=makeStyles((theme)=>({
  
    root:{
        userSelect:'none',
        backgroundColor:"#363740" ,
        display: "flex",
        alignItems:'center',
        justifyContent:"center",
        FlexDirection:'column',
        position: "relative",
        left:0,
        right:0,
        minHeight:'100%',
        top:0,
        textAlign:'center',
        padding: theme.spacing(1),
        
    },
    paper:{
        color:"#A4A6B3",
        maxWidth:400,
        padding:`${theme.spacing(3) + 6}px` ,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]:{
          width:'100%'
        }
    },
    avatar:{
        backgroundColor:"#3751FF",
        width:48,
        height:48,
    },
    login:{
        color:theme.palette.common.black
    },
    grid:{
       width:' calc(100% + 16px)', 
      margin: '-8px',
      "& > *":{
        padding:'8px',
      },
      [theme.breakpoints.down('xs')]:{
      width:' calc(100% )', 
      margin: '0px',
      "& > *":{
        padding:'0px',
      },
      },
    }
   
}))


export const BootstrapInput = styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
 
  '& .MuiOutlinedInput-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor:'#fcfcfb'  ,
    fontSize: 16,
    width: '100%',
    padding: theme.spacing(1.5,2),
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#007FFF",
    },
}));
