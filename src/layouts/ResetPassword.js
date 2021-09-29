import {useState } from 'react'
import {  BootstrapInput} from 'assets/js/login/style'
import {  makeStyles,styled} from '@material-ui/core/styles'
import { useForm, Controller } from "react-hook-form";
import ErrorIcon from '@material-ui/icons/Error'
import { CssBaseline, Grid, Snackbar } from '@material-ui/core';
import CheckCircleOutlineIcon  from '@material-ui/icons/CheckCircleOutline';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Paper, Typography, Button, FormHelperText } from '@material-ui/core';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { useHistory } from 'react-router';
 const useStyles=makeStyles((theme)=>({
    root:{
        userSelect:'none',
        backgroundColor:"#363740" ,
        display: "flex",
        alignItems:'center',
        justifyContent:"center",
        msFlexDirection:'column',
        position: "absolute",
        left:0,
        right:0,
        bottom:0,
        top:0,
       padding: theme.spacing(1),

    },
    paper:{
        color:"#A4A6B3",
        width:380,
        textAlign:'center',
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]:{
          width:'100%',
        }
    },
    box:{
        padding:`${theme.spacing(3) + 6}px` ,
    },
}))
 const SnackbarEnhanced = styled(Snackbar)(({ theme }) => ({
    '& .MuiSnackbarContent-root':{
        backgroundColor:'red'
    }
}))


function ResetPassword() {
    const history=useHistory();
    const classes=useStyles();
    const [emailError, setEmailError] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [bar, setBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  
    const defaultValues = {
              email:"",
            };
    const { handleSubmit, control , formState: { errors } ,setValue,clearErrors } = useForm({ defaultValues,reValidateMode:"onSubmit"});   
    const emailRules={  required: "This field is required",  
                        pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                    }  
                              }
     
   
       const submitForm=async ({email}) =>{
           signInWithEmailAndPassword(auth,email,' ').catch((error)=>{
              const errorCode = error.code;
              console.log(errorCode)
              if(errorCode==='auth/invalid-email'|| errorCode==='auth/user-not-found'){
                    setEmailError('This email doesn\'t exist')
                    setTimeout(() => {
                    setValue('email',"")
                    setEmailError("")
                    }, 5000);
                    return ;
              }
              if(errorCode==='auth/wrong-password'){
 
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(true)  
                setTimeout(()=>{
                history.push('/login');
                },3000)
            })
            .catch((error) => {

                setMessage('Password reset has failed! retry again.')
                setBar({ open: true, ...bar });
                setTimeout(()=>{
           setBar({ open: false, ...bar });
           },5000)
            });

            setTimeout(() => {
                    setValue('email',"")
                    setEmailError("")
                    }, 3000);
                    return ;             
             } 
           setMessage('Password reset has failed! retry again.')
           setBar({ ...bar,open: true });
             console.log(bar)
           setTimeout(()=>{
           setBar({ ...bar ,open: false});
           },3000)
           setValue('email',"")

             })
          
       }
        const handleClose = () => {
            setBar({
            ...bar,
            open: false,
            });
        };
    return (
        <div className={classes.root}>
         <CssBaseline/>
          <SnackbarEnhanced 
        anchorOrigin={{ vertical: bar.vertical, horizontal: bar.horizontal }}
        open={bar.open}
        onClose={handleClose}
        message={message}
        key={bar.vertical + bar.horizontal}
      />
        <Paper className={classes.paper} >
            {!success?(<div>
              <Box className={classes.box}  component="form" noValidate autoComplete="off"    onSubmit={handleSubmit(submitForm)} >
               <Typography component='h3' variant="h6"  >
                   Enter your email  below
               </Typography>
            <FormControl required fullWidth style={{marginTop:"1rem"}}>
                    <InputLabel shrink htmlFor="email" >
                        Email
                    </InputLabel>
                     <Controller
                            render={
                              ({field:{ onChange,...rest }}) =>  <BootstrapInput 
                            placeholder="Email address"
                            id="email"  
                            type='email'
                        onChange={(e) =>{ clearErrors("email"); onChange(e.target.value) }  }
                             
                            error={!!errors?.email || emailError} {...rest} 
                             /> 
                            }

                            type='email'
                            control={control}
                            name='email'
                            rules={emailRules}
                              aria-describedby='email-helper-text'
                      /> 
                       <FormHelperText id="email-helper-text" style={{color:'red',minHeight:20,margin:'.5rem 0'}}> 
                      {(!!errors?.email || emailError) && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.email?.message || emailError} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>

           <Button style={{minWidth:'50%'}} type='submit' variant="contained" color="primary" >  
                  Reset
            </Button>      
          
       </Box>
       </div>
       ):( <Box className={classes.box} style={{backgroundColor:' rgba(237, 247, 237,1)',color:'#444'}}> 
       <Grid container style={{textAlign:'left',fontSize:16}}
        alignItems='center' spacing={2} >
            <Grid item>
            <CheckCircleOutlineIcon style={{color:'#00c853'}} /> 
            </Grid>
            <Grid xs item >
                An email has been sent to your email address - Check it out now!
            </Grid>
       </Grid>
       </Box>
          )}

       </Paper> 
        </div>
    )
}

export default ResetPassword
 