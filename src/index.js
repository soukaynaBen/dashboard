import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App'
import { store } from 'app/store'
import { Provider } from 'react-redux'
import 'index.css'
import {auth} from 'firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from 'layouts/Loading';
import ErrorPage from 'layouts/404';
const CurrentUser = () => {

const [,loading, error] = useAuthState(auth);
       if (loading) {
    return (
      <>
        <Loading/>
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorPage/>
      </>
    );
  }
  return(<>
    <App/> 
      
      </>
      )

}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUser/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
