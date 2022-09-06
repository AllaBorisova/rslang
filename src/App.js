import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/scss/bootstrap.scss'
import './styles/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Dictionary from './pages/Dictionary'
import Home from './pages/Home'
import Textbook from './pages/Textbook'
import Audiocall from './pages/Audiocall'
import Sprint from './pages/Sprint'
import Statistics from './pages/Statistics'
import useToken from './components/Auth/UseToken'

function App() {
    const { token, setToken, logout } = useToken()

    return (
        <main>
            {token && (
                <>
                    <Header token={token} logout={logout} setToken={setToken} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/textbook" element={<Textbook />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/audiocall" element={<Audiocall />} />
                        <Route path="/sprint" element={<Sprint />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                    <Footer />
                </>
            )}
            {!token && (
                <>
                    <Header token={token} logout={logout} setToken={setToken} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/textbook" element={<Textbook />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/audiocall" element={<Audiocall />} />
                        <Route path="/sprint" element={<Sprint />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                    <Footer />
                </>
            )}
        </main>
    )
}

export default App
