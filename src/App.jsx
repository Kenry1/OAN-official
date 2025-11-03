import React from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Sectors from './pages/Sectors'
import ContactUs from './pages/ContactUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
