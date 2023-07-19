import React from 'react'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import { Routes, Route } from 'react-router-dom'

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' Component={Home} />
      <Route exact path='/Auth' Component={Auth} />
      <Route exact path='/Questions' Component={Questions} />
      <Route exact path='/AskQuestion' Component={AskQuestion} />
    </Routes>
  )
}

export default AllRoutes