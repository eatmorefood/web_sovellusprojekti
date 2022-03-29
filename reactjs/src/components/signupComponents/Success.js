import React, { useEffect } from 'react';
import '../Signup.css';

//This is part 4/4 of the multiphase signup form
const Success = () => {

  useEffect(() => { //automatically scrolls to the top of the page, useful for mobile userss
    window.scrollTo(0, 0)
  }, []);

  setTimeout(function() {
    window.location.replace('/');
  }, 3500);

  return (
    <div className="signupSuccessView">
      <h1>Account created! &#129395;</h1>
      <p>redirecting..</p>
    </div>
  )
}

export default Success;