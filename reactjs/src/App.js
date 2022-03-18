import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Search from './components/Search.js';
import Home from './components/Home.js';
import Support from './components/Support.js';
import Businesses from './components/Businesses.js';
import NotFound from './components/NotFound.js';

function App() {

  return (
    <div className="App">
        <Header />

        <div className="content"> 
          <Router>
            <Routes>
              <Route path='/' element={<Search />} />
              <Route path='/home' element={<Home />} />
              <Route path='/support' element={<Support />} />
              <Route path='/businesses' element={<Businesses />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>  
          </Router>
        </div>

        <footer className="footer">
          <Footer />
        </footer>
    </div>
  );
}

export default App;