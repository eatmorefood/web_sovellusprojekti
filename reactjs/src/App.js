import './App.css';
//import { useEffect, useState } from 'react';
//import axios from 'axios';
import Header from './components/Header.js';
import Footer from './components/Footer.js';


function App() {

  return (
    <div className="App">
        <Header />

      <div className="content">
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
      </div>
      <Footer />
    </div>
  );
}

export default App;