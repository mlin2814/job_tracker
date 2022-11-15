import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
// import Contact from '../../server_side/models/Contact';
import Contact from './pages/Contact'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
          </Routes>
          {/* <Routes>
            <Route 
              path="/jobs" 
              element={<Home />} 
            />
          </Routes> */}
          <Routes>
            <Route 
              path="/contacts" 
              element={<Contact />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


