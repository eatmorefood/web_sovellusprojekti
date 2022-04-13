import './App.css';
import {Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Discover from './components/Discover.js';
import Support from './components/staticPages/Support.js';
import Businesses from './components/staticPages/Businesses.js';
import Login from './components/customerAuth/Login.js';
import NotFound from './components/staticPages/NotFound.js';
import Signup from './components/customerAuth/Signup.js';
import Disclaimer from './components/staticPages/Disclaimer.js';
import BusinessProfile from './components/profileComponents/BusinessProfile.js';
import MenuPage from './components/MenuPage.js';

const importJWTFromBrowser = window.localStorage.getItem('token');

function App() {
  
  const ref = useRef()  
  const [loginVisible, setLoginVisible] = useState(false); //state for login screen visibility
  const [userJWT, setUserJWT] = useState(importJWTFromBrowser);

  let loginScreen = <></>; //initialize login screen as non-visible
  let noAuthRoutes = <><Route path='/signup' element={<Signup login={ receivedJWT => {
                              setUserJWT(receivedJWT)
                              window.localStorage.setItem('token', receivedJWT)
                              }}/>} /></>
  let authRoutes = <></>;

  let mainPageRoutes =<Route path='/' element={<Discover userLoggedIn={ userJWT != null } jwt={ userJWT }/>} />;

  console.log(importJWTFromBrowser);

  if(userJWT != null){
    //console.log("userjwt log");
    mainPageRoutes = <Route path='/' element={<MenuPage userLoggedIn={ userJWT != null } jwt={ userJWT }/>} />
    noAuthRoutes = <></>
    authRoutes = <><Route path='/profile/*' element={<BusinessProfile jwt={ userJWT }/>} /></>
    loginScreen = <></>;
  } else if(loginVisible === true) { //login screen visible, displayLogin = button in login screen to close itself
    loginScreen = <Login login={ receivedJWT => { setUserJWT(receivedJWT)
                          window.localStorage.setItem('token', receivedJWT)
                          }}
                          displayLogin={ toggleLogin } />;
  }
  
  /*useEffect(() => { //checks if login screen is visible => if yes, then sets background blur & disables page scrolling
    const app = document.getElementById("blurrableContent");
    if( loginVisible === true) {
      app.style.filter = "blur(8px)";
      app.style.background = "lightgrey";
      app.style.pointerEvents = "none";
      app.style.cursor = "pointer"; 
      document.body.style.overflow = "hidden";
      
    } else if( loginVisible === false) { //restores normal page view when login screen not visible
      app.style.removeProperty("background");
      app.style.removeProperty("filter"); 
      app.style.removeProperty("pointerEvents");
      app.style.removeProperty("pointer");
      document.body.style.removeProperty("overflow"); 
    }
  });*/

  function toggleLogin() { //function to switch login screen visibility status
    setLoginVisible(!loginVisible);
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      //if the login screen is open and user clicks outside the login screen, then close the login screen
      if (!ref.current.contains(e.target) && !e.target.matches('.login') && !e.target.matches('.loginSpan') && !e.target.matches('.userIcon')) {
        setLoginVisible(false);
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      //cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    }
  }, [loginVisible]);

  return (
    
    <div className="App">
      {/*<Router>*/}
      <div id="loginMain" ref={ref}>
        { loginScreen }
      </div>
      <div id="blurrableContent"> 
        <Header userLoggedIn={ userJWT != null }
                jwt={ userJWT }
                displayLogin={ toggleLogin }
                logout={ () => {setUserJWT(null)
                window.localStorage.removeItem('token')}}/>
        <div id="appContent">
            <Routes>
              { mainPageRoutes }
              { noAuthRoutes }
              { authRoutes }
              <Route path='/support' element={<Support />} />
              <Route path='/businesses' element={<Businesses />} />
              <Route path='/disclaimer' element={<Disclaimer />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>  
        </div>

        <footer className="footer">
          <Footer />
        </footer>

      </div>
      {/*</Router>*/}
    </div>
  );
}

export default App;