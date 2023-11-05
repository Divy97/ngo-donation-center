import React from 'react'
import Home from './components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Donor from './components/donor/Donor'
import Ngo from './components/ngo/Ngo'
import DonorSignUp from './components/donorSignUp/DonorSignUp'
import NGOSignUp from './components/ngoSignUp/NgoSignUp'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/donor' element={<Donor />} />
      <Route path='/ngo' element={< Ngo />} />
      <Route path='/donorSignUp' element={< DonorSignUp />} />
      <Route path='/ngoSignUp' element={< NGOSignUp />} />

    </Routes>
  )
}

export default App