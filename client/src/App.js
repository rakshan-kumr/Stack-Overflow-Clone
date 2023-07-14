import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import NavBar from './components/Navbar/Navbar'

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
      </Router>
    </div>
  )
}

export default App
