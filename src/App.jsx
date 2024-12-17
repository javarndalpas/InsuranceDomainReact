import { useEffect, useState } from 'react'
import './App.css'
import { UserDashboard } from './pages/UserDashboard'
import { AllRoutes } from './pages/AllRoutes'
import { Navbar } from './components/Navbar'
import { useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
    }
  }, [location]);


  return (
    <>
      <div className='mt-20'>
      {location.pathname !== '/' && location.pathname !== '/signup' && (
          <Navbar />
        )}
        <AllRoutes />
        {location.pathname !== '/' && location.pathname !== '/signup' && (
          <Footer />
        )}
      </div>
    </>
  )
}

export default App
