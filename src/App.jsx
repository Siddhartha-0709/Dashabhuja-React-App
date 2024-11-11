import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footprints from './Screens/Footprints';
import Home from './Screens/Home';
import './App.css';
import ProductSubmissionForm from './Screens/ProductSubmissionForm';
import logo from '../src/assets/dashabhuja.png'
function App() {
  return (
    <Router>
      <div>
        <header className="header bg-white flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
            <div>
              <h1 className="text-black text-2xl" style={{ fontFamily: 'Samkaran', color: '#FF4545', top: 10, position: 'relative' }}>Dashabhuja</h1>
              <p className="text-black text-sm" style={{ fontFamily: 'Ubuntu', fontWeight: '300', color: '#000000', fontSize: 14 }}>Women Empowerment and Protection</p>
            </div>
          </div>
          <Link to="/product-upload" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Upload Product</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-footprints/:id" element={< Footprints/>} />
          <Route path="/product-upload" element={< ProductSubmissionForm/>} />
        </Routes>
        <footer className='footer bg-gray-900 h-12 flex items-center justify-center bottom-0 left-0 right-0 p-10'>
          <div>
            <p className='text-white text-center' style={{ fontFamily: 'Ubuntu',fontWeight:'300', color: '#FFFFFF', fontSize: 18 }}>© 2024 Dashabhuja. All rights reserved.</p>
            <p className='text-white text-center' style={{ fontFamily: 'Ubuntu',fontWeight:'300', color: '#999999', fontSize: 14 }}>A Project Made for Women Empowerment and Protection | Made With ❤️ Siddhartha Mukherjee & Team</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
