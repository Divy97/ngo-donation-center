import React from 'react'
import Home from './components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Donor from './components/donor/Donor'
import Ngo from './components/ngo/Ngo'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/donor' element={<Donor />} />
      <Route path='/ngo' element={< Ngo />} />
    </Routes>
  )
}

export default App