import { useState } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/register/Register';
import Home from './pages/home/home';
import Login from './pages/login/login';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <>
      {/* <div className="">Hello world</div> */}
      <Router>
        <Routes>
          <Route path='/' exact element={<Register />} />
        </Routes>
        <AuthProvider>
          <Routes>
            {/* <Route path='/' exact element={<Register />} /> */}
            <Route path='/home' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
          </Routes>
        </AuthProvider>

      </Router>

    </>
  )
}

export default App
