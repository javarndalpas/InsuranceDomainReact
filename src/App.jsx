import { useState } from 'react'
import './App.css'
import { UserDashboard } from './pages/UserDashboard'
import { AllRoutes } from './pages/AllRoutes'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
      <div className='mt-20'>
        <Navbar />
        <AllRoutes />
      </div>
    </>
  )
}

export default App
