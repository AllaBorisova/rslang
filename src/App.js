import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/scss/bootstrap.scss';
import './styles/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Dictionary from './pages/Dictionary';
import Home from './pages/Home';
import Textbook from './pages/Textbook';
import Audiocall from './pages/Audiocall';
import Sprint from './pages/Sprint';
import Statistics from './pages/Statistics';
import Navigation from './components/Navigation';
import useToken from './components/Auth/UseToken';
import LoginPopup from './components/LoginPopup';
import SignUp from './components/SingUp';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
    const { token, setToken, logout, userId } = useToken();
  
    return (
        <main>
            {token && (
                <><Header token={token} logout={logout} setToken={setToken} /><Navigation /><Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/textbook" element={<Textbook />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/audiocall" element={<Audiocall />} />
                    <Route path="/sprint" element={<Sprint />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/" element={<Home />} />
                </Routes><Footer /></>
            )}
            {!token && (
                <><Header token={token} logout={logout} setToken={setToken} /><Navigation /><Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/textbook" element={<Textbook />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/audiocall" element={<Audiocall />} />
                    <Route path="/sprint" element={<Sprint />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/" element={<Home />} />
                </Routes><Footer /></>
            )}
           
        </main>
    );
}

export default App;
