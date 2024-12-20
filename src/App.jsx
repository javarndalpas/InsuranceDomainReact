import { useEffect } from 'react';
import './App.css';
import { AllRoutes } from './pages/AllRoutes';
import { Navbar } from './components/Navbar';
import { useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';

function App() {
  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== '/' && location.pathname !== '/signup';

  // Removed empty useEffect block, as it wasn't serving any purpose.

  return (
    <div className="mt-20">
      {showNavbarAndFooter && <Navbar />}
      <AllRoutes />
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
