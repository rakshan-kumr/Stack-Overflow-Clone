import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import NavBar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllQuestions } from './actions/question'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    console.log('%cfetch All Questions fired in useEffect!', 'color: red')
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
