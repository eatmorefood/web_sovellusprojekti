import React, { useEffect } from 'react';
import './Signup.css';

//This is part 4/4 of the multiphase signup form
const Success = () => {

  useEffect(() => { //automatically scrolls to the top of the page, useful for mobile userss
    window.scrollTo(0, 0)
  }, []);

  return (
    <div>
      <h1>You are done!</h1>
    </div>
  )
}

export default Success