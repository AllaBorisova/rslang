import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Group from '../components/Book/Group';
import Pagination from '../components/Book/Pagination';
import WordsPage from '../components/Book/WordsPage';
import DifficultButton from '../components/Book/DiffucultButton';
import GetStorage from '../components/Book/LocalStorage';
import {NavLink} from 'react-router-dom'

function Textbook() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`;
    const [user, setUser] = GetStorage('userData', '');
    const [value, setValue] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).value : '0'
    );
    const [pageNumber, setPageNumber] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).pageNumber : 0
    );
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('page', JSON.stringify({ pageNumber, value }));
    });

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}group=${value}&page=${pageNumber}`);
            setWords(res.data);
            setLoading(false);
        };
        getList();
    }, [value, pageNumber, BASE_URL]);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const settings = {
        fromBook: true,
        page: pageNumber,
        value,
    }
    return (
        <section className="textbook-main my-4">
            <NavLink to="/sprint" state={settings}>
                перейти на игру Спринт
            </NavLink>
            <NavLink to="/audiocall" state={settings}>
                перейти на игру Аудиовызов
            </NavLink>
            <Container>
                <Row className="pb-5">
                    <Col>
                        <h1>Textbook</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className=" group-btn">
                        <Group action={setValue} reset={setPageNumber} />
                        <DifficultButton user={user} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination action={changePage} current={pageNumber} />
                    </Col>
                </Row>

                <Row>
                    <div className="word-wrapper">
                        <WordsPage words={words} loading={loading} user={user} dict={false} props={value} />
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Pagination action={changePage} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Textbook;
