import {BrowserRouter as Router, Route , Redirect, Switch} from 'react-router-dom';
import Login from "layouts/Login"
import Admin from "layouts/Admin"
import SignUp from "layouts/SignUp"
import { useSelector, useDispatch } from 'react-redux'
import {  logout,login } from 'features/userSlice'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from 'firebaseConfig';
import {useEffect} from 'react'
import ResetPassword from 'layouts/ResetPassword';
function App() {
 const user = useSelector((state) => state.user.user)
 const dispatch=useDispatch();
 useEffect(() => {
   
    onAuthStateChanged(auth,  (userCredential)=>{
        if(userCredential){
            dispatch(login({
               displayName : userCredential.displayName,
               photoURL : userCredential.photoURL,
            }));
        }else{
            dispatch(logout());
        }
    })
      
  
 }, [dispatch])
    return (
       <Router>
        <Switch> 
            {user? 
            ( 
             <Switch> 
            <Route   path="/admin" component={Admin}/>
            <Redirect from="/" to="/admin"/>
              </Switch> 
            ):( 
              <Switch> 
            <Route exact path="/signup" component={SignUp}/>
            <Route exact  path="/login" component={Login}/>
            <Route exact  path="/reset-pasword" component={ResetPassword}/>
            <Redirect from="/" to="/login"/>
              </Switch> 
            )
            }
        </Switch> 
       </Router>
    )
}

export default App
