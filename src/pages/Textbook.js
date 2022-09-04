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

import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

function Textbook() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`;
    const USER_URL = `https://teamwork-rs.herokuapp.com/users/`;
    const [user, setUser] = GetStorage('userData', '');
    const { userId, token } = user;

    const [value, setValue] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).value : '0'
    );
    const [pageNumber, setPageNumber] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).pageNumber : 0
    );
    const [words, setWords] = useState([]);

    const [count, setCount] = useState(0);
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

    // useEffect(() => {
    //     const getStat = async () => {
    //         await fetch(`${USER_URL}${userId}/statistics`, {
    //             method: 'GET',
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //             .then((response) => console.log(response.status))
    //             .then((result) => result.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setCount(data.learnedWords);
    //             })
    //             .catch((e) => console.log(e.message));
    //     };

    //     getStat();
    // }, [USER_URL]);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const settings = {
        fromBook: true,
        page: pageNumber,
        value,
    };

    const handleCount = () => {
        setCount(count + 1);
    };

    return (
        <section className="textbook-main py-4 full-section">
            <Container>
                <Row className="pb-5">
                    <Col>
                        <h1>Textbook</h1>
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col className="text-center">
                        <Button as={NavLink} to="/sprint" state={settings} className="m-1">
                            Спринт
                        </Button>
                        <Button as={NavLink} to="/audiocall" state={settings} className="m-1">
                        Аудиовызов
                        </Button>
                       
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col className=" group-btn">
                        <Group action={setValue} reset={setPageNumber} />
                        <DifficultButton userId={userId} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination action={changePage} current={pageNumber} />
                    </Col>
                </Row>

                <Row>
                    <div className="word-wrapper">
                        <WordsPage
                            words={words}
                            loading={loading}
                            user={user}
                            dict={false}
                            props={value}
                            action={handleCount}
                            count={count}
                        />
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Pagination action={changePage} current={pageNumber} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Textbook;
