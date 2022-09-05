import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Loading from '../components/Loading'
import useToken from '../components/Auth/UseToken'

function Statistics() {
    const { token, setToken, logout, userId } = useToken()
    const [userStatistic, setUserStatistic] = useState([])
    const [userStatisticHard, setUserStatisticHard] = useState([])
    const [userStatisticEasy, setUserStatisticEasy] = useState([])
    const [userStatisticSprint, setUserStatisticSprint] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getUserAggregatedWords = async (userId, token) => {
        try {
            setError('')
            setLoading(true)
            const rawResponse = await fetch(
                `https://teamwork-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=1000`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await rawResponse.json()
            const res = content[0].paginatedResults
            setUserStatistic(res)
            setLoading(false)
        } catch (e) {
            const error = e
            setLoading(false)
            setError(error.message)
        }
    }

    const getUserAggregatedWordsHard = async (userId, token) => {
        try {
            setError('')
            setLoading(true)
            const rawResponse = await fetch(
                `https://teamwork-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await rawResponse.json()
            const res = content[0].paginatedResults
            setUserStatisticHard(res)
            setLoading(false)
        } catch (e) {
            const error = e
            setLoading(false)
            setError(error.message)
        }
    }

    const getUserAggregatedWordsEasy = async (userId, token) => {
        try {
            setError('')
            setLoading(true)
            const rawResponse = await fetch(
                `https://teamwork-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"easy"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await rawResponse.json()
            const res = content[0].paginatedResults
            setUserStatisticEasy(res)
            setLoading(false)
        } catch (e) {
            const error = e
            setLoading(false)
            setError(error.message)
        }
    }

    const getUserAggregatedWordsSprint = async (userId, token) => {
        try {
            setError('')
            setLoading(true)
            const rawResponse = await fetch(
                `https://teamwork-rs.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=100&filter={"userWord.optional.game":"sprint"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await rawResponse.json()
            const res = content[0].paginatedResults
            setUserStatisticSprint(res)
            setLoading(false)
        } catch (e) {
            const error = e
            setLoading(false)
            setError(error.message)
        }
    }

    if (token) {
        useEffect(() => {
            getUserAggregatedWords(userId, token)
            getUserAggregatedWordsHard(userId, token)
            getUserAggregatedWordsEasy(userId, token)
            getUserAggregatedWordsSprint(userId, token)
        }, [])
    }

    if (loading) {
        return (
            <section className="py-4 game-section full-section">
                <Container>
                    <Row className="justify-content-center">
                        <Loading />
                    </Row>
                </Container>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-4 full-section">
                <Container>
                    <div>
                        <div>
                            <Row className="justify-content-center">
                                <p>{error}</p>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
        )
    }
    return (
        <section className="py-4 full-section">
            <Container>
                {token && (
                    <>
                        <h1>Статистика доступна</h1>
                        <h2>Сложные слова {userStatisticHard.length}</h2>
                        <ul>
                            {userStatisticHard.map((number) => (
                                <li key="{number._id}">{number.word}</li>
                            ))}
                        </ul>
                        <h2>Легкие слова {userStatisticEasy.length}</h2>
                        <ul>
                            {userStatisticEasy.map((number) => (
                                <li key="{number._id}">{number.word}</li>
                            ))}
                        </ul>
                        <h2>Слова из спринта {userStatisticSprint.length}</h2>
                        <ul>
                            {userStatisticSprint.map((number) => (
                                <li key="{number._id}">{number.word}</li>
                            ))}
                        </ul>
                    </>
                )}
                {!token && <h1>Статистика недоступна</h1>}
            </Container>
        </section>
    )
}

export default Statistics
