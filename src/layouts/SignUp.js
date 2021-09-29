import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Paper, Grid,Avatar, Typography, Button, FormHelperText } from '@material-ui/core';
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"
import {InputAdornment,IconButton} from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { collection, addDoc } from "firebase/firestore/lite"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useHistory} from 'react-router-dom'
import {useStyles, BootstrapInput} from 'assets/js/signUp/style'
import {auth,db} from 'firebaseConfig';
import { useForm, Controller } from "react-hook-form";
import ErrorIcon from '@material-ui/icons/Error';


export default function CustomizedInputs() {
    const classes=useStyles();
    const history=useHistory();
    const [showPassword, setShowPassword] = useState( false );
    const [showConfPassword, setShowConfPassword] = useState( false );
    const defaultValues = {
              firstName:"",
              lastName:"",
              email:"",
              password:"",
              confPassword:"",
            }; 

    const { handleSubmit, reset, control , formState: { errors }, watch,setValue } = useForm({ defaultValues,

  });   
  
  
     const password=watch("password", "");

      const firstNameRules= {
                              required:{value:true,message:"This field is required" } ,
                              pattern: {
                                value: /^[a-zA-Z ,.'-]+$/,
                                message: "You first name has to contain just letters"
                                },
                                maxLength: {
                                value: 16,
                                message: "max length is 16"
                              },
                                minLength: {
                                value: 3,
                                message: "min length is 2"
                              }
                              }
      const lastNameRules=   {
                              required: "This field is required",
                              pattern: {
                                value: /^[a-zA-Z ,.'-]+$/,
                                message: "You last name has to contain just letters"
                                },
                                maxLength: {
                                value: 16,
                                message: "max length is 16"
                              },
                                minLength: {
                                value: 3,
                                message: "min length is 3"
                              }
                              }
     
      const emailRules=   {
                              required: "This field is required",  
                              pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Entered value does not match email format"
                            }  
                              }
     
      const passwordRules=   {
                            required: "This field is required",
                                minLength: {
                                value: 6,
                                message: "min length is 6 characters"
                              },
                                maxLength: {
                                value: 200,
                                message: "max length is 200 characters"
                              }
                              }
      const confPasswordRules={required: "This field is required",
                                minLength: {
                                value: 6,
                                message: "min length is 6"
                              },
                                validate: value => 
            value === password|| "The passwords do not match" 
                              }

  

     const handleMouseDownPassword = (event) => {
    event.preventDefault();
     };
   
  
   const submitForm=async (data)=>{

     const formData = data;
    createUserWithEmailAndPassword(auth, formData.email,  formData.password)
      .then((userAuth) => {
        const userData={
          firstName : formData.firstName,
          lastName : formData.lastName,
          email: formData.email,
        }
        updateProfile( userAuth.user,{
                displayName:formData.firstName,
                photoURL:''
        })
        addDoc(collection(db, "Users"),userData)
          reset();
        history.push('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        if('auth/email-already-in-use'=== errorCode || 'auth/email-already-exists'===errorCode){
          alert('Cette email exist déja') 
          setValue('email',"",{ shouldValidate: true })
          return ;
        }
          alert('Une erreur s\'est produite') 
      })

   }

  return (
      <div className={classes.root}>
       <CssBaseline/>
        <Paper className={classes.paper}>

               <Avatar className={classes.avatar}>
                    D
               </Avatar>
               
               <Typography component='h1' variant="subtitle1" gutterBottom >
                   Dashboard Kit
               </Typography>

               <Typography className={classes.login} component='h2' variant="h5" gutterBottom >
                   Sign Up to Dashboard kit
               </Typography>
            
        <Box onSubmit={handleSubmit(submitForm)} component="form" noValidate autoComplete="off"  >
               <Grid container  className={classes.grid} >
               <Grid item xs={12} sm={6}>
      <FormControl required fullWidth  style={{marginTop:".5rem"}}>
                            <InputLabel shrink htmlFor="firstName" >
                                First Name
                            </InputLabel>
                          <Controller
                            render={
                              ({ field }) =>  <BootstrapInput   
                            placeholder="First Name"
                            id="firstName"
                            error={!!errors?.firstName} {...field} 
                            aria-describedby="firstName-helper-text"
                             /> 
                            }
                          name='firstName'   
                          rules={firstNameRules}
                          control={control}

                          />
                          
                   <FormHelperText id="firstName-helper-text" style={{color:'red'}}> 
                      {!!errors?.firstName && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.firstName?.message} 
                      </Typography> }
                    </FormHelperText>

                    </FormControl>              
               </Grid>
               <Grid item xs={12} sm={6}>
        <FormControl required fullWidth  style={{marginTop:".5rem"}}>
                              <InputLabel shrink htmlFor="lastName" >
                                  Last Name
                              </InputLabel>                      
                          <Controller
                            render={
                              ({ field }) =>  <BootstrapInput placeholder="Last Name"
                            id="lastName" 
                            error={!!errors?.lastName} {...field}  /> 
                            }
                            control={control}
                            name='lastName'  
                           aria-describedby='lastName-helper-text'
                            rules={lastNameRules }

                          />
                 <FormHelperText id="lastName-helper-text" style={{color:'red'}}> 
                      {!!errors?.lastName && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.lastName?.message} 
                      </Typography> }
                    </FormHelperText>
                      </FormControl>                
               </Grid>
               </Grid>

            <FormControl required fullWidth  style={{marginTop:".5rem"}}>
                    <InputLabel shrink htmlFor="email" >
                        Email
                    </InputLabel>
                     <Controller
                            render={
                              ({ field }) =>  <BootstrapInput 
                            placeholder="Email address"
                            id="email"  
                            type='email'
                            error={!!errors?.email} {...field}  /> 
                            }

                            type='email'
                            control={control}
                            name='email'
                            rules={emailRules}
                           aria-describedby="email-helper-text" 

                      />
                       <FormHelperText id="email-helper-text" style={{color:'red'}}> 
                      {!!errors?.email && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.email?.message} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>

            <FormControl required fullWidth  style={{marginTop:".5rem"}}>
                    <InputLabel shrink htmlFor="password">
                      Password
                    </InputLabel>
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
                    error={!!errors?.password}
                    
                      /> 
                            }
                    control={control}
                    name='password'
                    rules={passwordRules}
                    aria-describedby="password-helper-text" 

                          />
                  <FormHelperText id="password-helper-text" style={{color:'red'}}> 
                      {!!errors?.password && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.password?.message} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>
      
            <FormControl required fullWidth   style={{marginTop:".5rem"}}>
                    <InputLabel shrink htmlFor="confPassword">
                      Confirm Password
                    </InputLabel>
                    <Controller
                        render={
                          ({ field }) =>  <BootstrapInput  {...field} placeholder="Confirm Password"
                        id="confPassword"
                        type={showConfPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>setShowConfPassword( !showConfPassword ) }
                              onMouseDown={(e) => handleMouseDownPassword }
                              edge="end"
                            >
                              {showConfPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }  error={!!errors?.confPassword}   /> 
                        }
                        control={control}
                        name='confPassword'
                        rules={confPasswordRules}
                        aria-describedby='confPassword-helper-text'
                          />
             <FormHelperText id="confPassword-helper-text" style={{color:'red'}}> 
                      {!!errors?.confPassword && 
                      <Typography variant="caption" style={{display:'flex',alignItems:'center'}}>
                          <ErrorIcon style={{fontSize:15,marginRight:5}}/> 
                          { errors?.confPassword?.message} 
                      </Typography> }
                    </FormHelperText>
            </FormControl>
            <Button fullWidth type='submit' variant="contained" color="primary" style={{marginTop:"1rem"}}>  
               Sign Up
            </Button>      
       </Box>
        </Paper>
      </div>
  );
}  