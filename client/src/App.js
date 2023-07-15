import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import NavBar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <AllRoutes />
      </Router>
    </div>
  )
}

export default App
