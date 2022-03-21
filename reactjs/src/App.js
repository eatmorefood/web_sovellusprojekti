import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Search from './components/Search.js';
import Home from './components/Home.js';
import Support from './components/Support.js';
import Businesses from './components/Businesses.js';
import Login from './components/Login.js';
import NotFound from './components/NotFound.js';
import Signup from './components/Signup.js';
import Disclaimer from './components/Disclaimer.js';

function App() {
  const ref = useRef()  
  const [loginVisible, setLoginVisible] = useState(false); //state for login screen visibility
  const [loginState, setLoginState] = useState(false); //state for wether user is logged in or not

  let loginScreen = ""; //initialize login screen as non-visible
  if( loginVisible === true && loginState === false ) { //login screen visible, displayLogin = button in login screen to close itself
    loginScreen = <Login displayLogin={ toggleLogin } />;
  }

  useEffect(() => { //checks if login screen is visible => if yes, then sets background blur & disables page scrolling
    const app = document.getElementById("blurrableContent");
    if( loginVisible === true && loginState === false ) {
      app.style.filter = "blur(8px)";
      app.style.background = "lightgrey";      
      document.body.style.overflow = "hidden";
      
    } else if( loginVisible === false && loginState === false ) { //restores normal page view when login screen not visible
      app.style.removeProperty("background");
      app.style.removeProperty("filter"); 
      document.body.style.removeProperty("overflow"); 
    }
  });

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
      <Header displayLogin={ toggleLogin }/>
      <div id="loginMain" ref={ref}>
        { loginScreen }
      </div>
      <div id="blurrableContent"> 

        <div id="appContent">
          <Router>
            <Routes>
              <Route path='/' element={<Search />} />
              <Route path='/home' element={<Home />} />
              <Route path='/support' element={<Support />} />
              <Route path='/businesses' element={<Businesses />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/disclaimer' element={<Disclaimer />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>  
          </Router>
        </div>

        <footer className="footer">
          <Footer />
        </footer>

      </div>
    </div>
  );
}

export default App;