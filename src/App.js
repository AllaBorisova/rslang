import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/scss/bootstrap.scss'
import './styles/App.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Header from './components/Header'
import Footer from './components/Footer'
import Dictionary from './pages/Dictionary'
import Home from './pages/Home'
import Textbook from './pages/Textbook'
import Audiocall from './pages/Audiocall'
import Sprint from './pages/Sprint'
import Statistics from './pages/Statistics'
import Navigation from './components/Navigation'
import useToken from './components/Auth/UseToken'
import LoginPopup from './components/LoginPopup'
import SignUp from './components/SingUp'

function App() {
    const { token, setToken, logout, userId } = useToken()
    if (!token) {
        const userDataString = localStorage.getItem('userData')
        const userData = JSON.parse(userDataString)
    }

    return (
        <main>
            {/* <Header /> */}
            {!token && (
                <>
                    <header className="my-2">
                        <Container>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                    <h1>RSLANG</h1>
                                </Col>

                                <Col xs={8} className="text-end">
                                    <LoginPopup setToken={setToken} />
                                    <SignUp setToken={setToken} />
                                </Col>
                            </Row>
                        </Container>
                    </header>
                    <Navigation />
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
            {token && (
                <>
                    <header className="my-2">
                        <Container>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                    <h1>RSLANG</h1>
                                </Col>

                                <Col xs={8} className="text-end">
                                    {/* Привет, {userData.name} */}
                                    <Button className="ms-1" variant="primary" onClick={logout}>
                                        Выйти
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </header>
                    <Navigation />
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
