import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footprints from './Screens/Footprints';
import Home from './Screens/Home';
import './App.css';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-fingerprints/:id" element={< Footprints/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
