import React from "react"
import { Routes, Route, Link } from "react-router-dom"

import "bootstrap/scss/bootstrap.scss"
import "./styles/App.scss"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Textbook from "./pages/Textbook"
import Audiocall from "./pages/Audiocall"
import Sprint from "./pages/Sprint"
import Statistics from "./pages/Statistics"

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Меню</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Главная
            </Nav.Link>

            <Nav.Link as={Link} to="/textbook">
              Учебник
            </Nav.Link>

            <Nav.Link as={Link} to="/audiocall">
              Аудиовызов
            </Nav.Link>

            <Nav.Link as={Link} to="/sprint">
              Спринт
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              Статистика
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

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
