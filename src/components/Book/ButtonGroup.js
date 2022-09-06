import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function ButtonGroup(props) {
    const { status, id, dict, action, count, hard, easy } = props
    const { userId, token } = GetStorage('userData', '')[0]
    const [request, setRequest] = useState('POST')
    useEffect(() => {
        if (status) {
            setRequest('PUT')
        }
    }, [status])
    const createUserWord = async (wordId, word) => {
        await fetch(`${USER_URL}${userId}/words/${wordId}`, {
            method: `${request}`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        })
            .then((res) => res.status)
            .catch((error) => {
                throw error
            })
    }

    const deleteUserWord = async (wordId) => {
        await fetch(`${USER_URL}${userId}/words/${wordId}`, {
            method: 'DELETE',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
    const easyUserWord = async (wordId, word) => {
        await fetch(`${USER_URL}${userId}/words/${wordId}`, {
            method: `${request}`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        })
            .then((res) => res.status)
            .catch((error) => {
                throw new Error(error.message)
            })
    }

    const LearningWord = async (text) => {
        await fetch(`${USER_URL}${userId}/statistics`, {
            method: `PUT`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(text),
        })
            .then((res) => res.status)
            .catch((error) => {
                throw new Error(error.message)
            })
    }
    // const key = new Date()
    const word = {
        difficulty: 'hard',
        optional: {
            audiocall: {
                wrong: 0,
                correct: 0,
            },
            sprint: {
                wrong: 0,
                correct: 0,
            },
        },
    }
    const word2 = {
        difficulty: 'easy',
        optional: {
            audiocall: {
                wrong: 0,
                correct: 0,
            },
            sprint: {
                wrong: 0,
                correct: 0,
            },
        },
    }
    const learned = {
        learnedWords: `${count}`,
        optional: {
            audiocall: {
                wrong: 0,
                correct: 0,
            },
            sprint: {
                wrong: 0,
                correct: 0,
            },
        },
    }

    if (dict) {
        return (
            <div className="btn-card-control">
                <Button
                    variant="danger"
                    className="btn-remove"
                    value={id}
                    onClick={() => {
                        deleteUserWord(id)
                        action[0]()
                        console.log(action[0])
                    }}
                >
                    Удалить
                </Button>{' '}
            </div>
        )
    }
    return (
        <div className="btn-card-control">
            <Button
                variant="danger"
                className="btn-add"
                value={id}
                disabled={hard}
                onClick={() => {
                    createUserWord(id, word)
                    action[1]()
                }}
            >
                Добавить в сложные
            </Button>{' '}
            <Button
                variant="secondary"
                className="btn-remove"
                value={id}
                disabled={easy}
                onClick={() => {
                    easyUserWord(id, word2)
                    action[3]()
                    LearningWord(learned)
                    action[2]()
                }}
            >
                Изучено
            </Button>{' '}
        </div>
    )
}

export default ButtonGroup
