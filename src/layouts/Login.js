import {useState} from 'react'
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Paper, Grid,Avatar, Typography, Button,Link, FormHelperText } from '@material-ui/core';
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"
import {InputAdornment,IconButton} from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider ,GoogleAuthProvider,updateProfile  } from "firebase/auth";
import {useStyles , BootstrapInput} from 'assets/js/login/style'
import {auth} from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import {login} from 'features/userSlice'
import github from 'assets/img/github.svg'
import google from 'assets/img/google.svg'
import { useForm, Controller } from "react-hook-form";
import ErrorIcon from '@material-ui/icons/Error'

export default function CustomizedInputs() {
    const classes=useStyles();
     const [showPassword, setShowPassword] = useState( false );
     const [passwordError, setPasswordError] = useState( "" );
     const [emailError, setEmailError] = useState( "" );

    const defaultValues = {
              email:"",
              password:"",
            };
    const { handleSubmit, reset, control , formState: { errors } ,setValue} = useForm({ defaultValues});   
    const emailRules={  required: "This field is required",
                        pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                              }  
                     }
     
      const passwordRules={
                            required: "This field is required",
                              }
      const dispatch = useDispatch()
     const handleMouseDownPassword = (event) => {
     event.preventDefault();
      };
    
    
   const submitForm=async (data) =>{
  const formData = data;

signInWithEmailAndPassword(auth, formData.email,  formData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch(login({ 
      displayName:user.displayName ,
      photoURL:user.photoURL 
      }));
      reset();
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode==='auth/invalid-email'|| errorCode==='auth/user-not-found'){

    setEmailError('This email doesn\'t exist')
    setTimeout(() => {
      setValue('email',"")
      setEmailError("")
    }, 5000);
    }

    if(errorCode==='auth/wrong-password'){

    setPasswordError('Wrong password')
    setTimeout(() => {
      setValue('password',"")
      setPasswordError("")
    }, 5000);
    }
  })
}
const signInWithGoogleProvider=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(async (result) => {
  
    // The signed-in user info.
    const user = result.user;
     dispatch(login({
       displayName:user.displayName ,
       photoURL:user.photoURL
     }))
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.error(errorCode)    
  });
}
const signInWithGitHubProvider=()=>{
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
  .then(async (UserCredential) => {
    const data={
      displayName:UserCredential._tokenResponse.screenName,
      photoURL:UserCredential._tokenResponse.photoUrl
    }
    updateProfile( UserCredential.user,data)
    dispatch(login(data))
  
   
  }).catch((error) => {
    const errorCode = error.code;
    console.error(errorCode);
  });
}

  
  return (
      <div className={classes.root}>
       <CssBaseline/>
        <Paper className={classes.paper}>

               <Avatar className={classes.avatar}>
                    D
               </Avatar>
               
               <Typography component='h1' variant="h6" gutterBottom >
                   Dashboard Kit
               </Typography>

               <Typography className={classes.login} component='h2' variant="h5"  >
                   Log In to Dashboard kit
               </Typography>
               <Typography component='h3' variant="h6"  className={classes.login}   >
                 With
               </Typography>
                 <Grid container spacing={2} justifyContent='center'>
                 <Grid item>
                   <IconButton onClick={signInWithGoogleProvider} >
                     <img src={google} alt='google logo' width={40} height={40}/>
                   </IconButton> 
                    </Grid>
                 <Grid item  >
                   <IconButton onClick={signInWithGitHubProvider}>
                     <img src={github} alt='github logo'  width={40} height={40}/>
                   </IconButton> 
                    </Grid>


                 </Grid>
        <Box component="form" noValidate autoComplete="off"   onSubmit={handleSubmit(submitForm)} >
               <Typography component='h3' variant="subtitle1"  >
                   Enter your email password below
               </Typography>
            <FormControl required fullWidth style={{marginTop:"1rem"}}>
                    <InputLabel shrink htmlFor="email" >
                        Email
                    </InputLabel>
                     <Controller
                            render={
                              ({ field }) =>  <BootstrapInput 
                            placeholder="Email address"
                            id="email"  
                            type='email'
                            error={!!errors?.email || emailError} {...field}  /> 
                            }

                            type='email'
                            control={control}
                            name='email'
                            rules={emailRules}
                              aria-describedby='email-helper-text'
                      /> 
                       <FormHelperText id="email-helper-text" style={{color:'red'}}> 
                      {(!!errors?.email || emailError) && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.email?.message || emailError} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>

            <FormControl required fullWidth  style={{marginTop:"1rem"}}>
                  <Grid container >
                  <Grid item xs >
                    
                    <InputLabel shrink htmlFor="password">
                      Password
                    </InputLabel>
                  </Grid>
                  <Grid item  >
                      <Link  variant="body2" underline="none"   href='/reset-pasword'>
                         {'forgot password ?'}
                      </Link>
                  </Grid>
                  </Grid>
                      <Controller
                    render={ 
                      ({ field}) =>  <BootstrapInput  {...field}
                    placeholder="Password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>setShowPassword( !showPassword ) }
                          onMouseDown={(e) =>handleMouseDownPassword  }
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    } 
                    error={!!errors?.password || passwordError}
                    
                      /> 
                            }
                    control={control}
                    name='password'
                    rules={passwordRules}
                    aria-describedby='password-helper-text'
                          />
                           <FormHelperText id="password-helper-text" style={{color:'red'}}> 
                      {(!!errors?.password || passwordError) && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.password?.message || passwordError} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>
            <Button fullWidth type='submit' variant="contained" color="primary" style={{marginTop:"1rem"}}>  
               Log In
            </Button>      
            <Typography  component="h6" variant="body2" style={{marginTop:"1rem"}} >
                Don't have an account?
                <Link  href="/signup" underline="none">
                {' Sign up'}
                </Link>  
            </Typography>
       </Box>
        </Paper>
      </div>
  );
}  