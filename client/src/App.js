import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import NavBar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { useEffect } from 'react'
import { fetchAllQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users'

function App() {
  const dispatch = useDispatch()

  console.log(navigator)
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

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
