import React from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Sectors from './pages/Sectors'
import CountryLanding from './pages/CountryLanding'
import ContactUs from './pages/ContactUs'
import { HashRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/country/:slug" element={<CountryLanding />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
