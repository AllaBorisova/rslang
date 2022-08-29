import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/scss/bootstrap.scss'
import './styles/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Textbook from './pages/Textbook'
import Audiocall from './pages/Audiocall'
import Sprint from './pages/Sprint'
import Statistics from './pages/Statistics'
import Navigation from './components/Navigation'

function App() {
    return (
        <main>
            <Header />
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/textbook" element={<Textbook />} />
                <Route path="/audiocall" element={<Audiocall />} />
                <Route path="/sprint" element={<Sprint />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </main>
    )
}

export default App
