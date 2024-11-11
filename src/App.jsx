import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footprints from './Screens/Footprints';
import Home from './Screens/Home';
import './App.css';
import ProductSubmissionForm from './Screens/ProductSubmissionForm';
function App() {
  return (
    <Router>
      <div>
        <header className="header bg-gray-900 h-16 flex items-center justify-between px-4">
          <div>
            <h1 className="text-white text-2xl" style={{ fontFamily: 'Samkaran', color: '#FFFFFF', fontSize: 30 }}>Dashabhuja</h1>
            <p className="text-white text-sm" style={{ fontFamily: 'Ubuntu', fontWeight: '300', color: '#FFFFFF', fontSize: 14 }}>Women Empowerment and Protection</p>
          </div>
          <a href="https://play.google.com/store/apps/details?id=com.dashabhuja.app" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get the App
          </a>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-footprints/:id" element={< Footprints/>} />
          <Route path="/product-upload" element={< ProductSubmissionForm/>} />
        </Routes>
        <footer className='footer bg-gray-900 h-12 flex items-center justify-center fixed bottom-0 left-0 right-0'>
          <p className='text-white text-center' style={{ fontFamily: 'Ubuntu',fontWeight:'300', color: '#FFFFFF', fontSize: 14 }}>© 2024 Dashabhuja. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
