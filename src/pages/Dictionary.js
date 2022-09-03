import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { NavLink } from 'react-router-dom'
import WordsPage from '../components/Book/WordsPage'
import GetStorage from '../components/Book/LocalStorage'
import Pagination from '../components/Book/Pagination'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function Dictionary() {
    const user = GetStorage('userData', '')[0]
    const { userId, token } = user
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        const getDiffList = async () => {
            setLoading(true)
            const Res = await fetch(
                `${USER_URL}${userId}/aggregatedWords?page=${page}&wordsPerPage=20&filter={"userWord.difficulty":"hard"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await Res.json()
            const res = content[0].paginatedResults
            setList(res)
            setLoading(false)
        }
        getDiffList()
    }, [page, loading, token, userId])
    const changePage = ({ selected }) => {
        setPage(selected)
    }
    return (
        <section>
            <Container>
                <Row className="pb-5">
                    <Col>
                        <h1>Difficult</h1>
                    </Col>
                </Row>
                <Row>
                    <NavLink to="/textbook">Вернуться к учебнику</NavLink>
                    <Row>
                        <Col>
                            <Pagination diff={page} action={changePage} dict />
                        </Col>
                    </Row>
                    <div className="word-wrapper">
                        <WordsPage words={list} loading={loading} props="0" user={user} dict />
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default Dictionary
