import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/esm/Row'
import Loading from '../components/Loading'
import useToken from '../components/Auth/UseToken'

function Statistics() {
    const { token, userId } = useToken()

    const [userStatisticHard, setUserStatisticHard] = useState([])
    const [userStatisticEasy, setUserStatisticEasy] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getUserAggregatedWordsHard = async () => {
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
            setLoading(false)
            setError(e.message)
        }
    }

    const getUserAggregatedWordsEasy = async () => {
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
            setLoading(false)
            setError(e.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAggregatedWordsHard()
            getUserAggregatedWordsEasy()
        }
    }, [])

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
                        <h2>Сложные слова {userStatisticHard.length}</h2>
                        <h2>Изученные слова {userStatisticEasy.length}</h2>
                    </>
                )}
                {!token && <h1>Статистика недоступна</h1>}
            </Container>
        </section>
    )
}

export default Statistics
