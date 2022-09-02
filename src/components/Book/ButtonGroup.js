import React, { useState, useEffect } from 'react'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function ButtonGroup(props) {
    const { status, id, dict, action } = props

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
    const key = new Date()
    const word = { difficulty: 'hard', optional: { testFieldString: 'test', testFieldBoolean: true } }
    const word2 = {
        difficulty: 'easy',
        optional: { testFieldString: 'test', testFieldBoolean: true, data: key },
    }
    if (dict) {
        return (
            <button
                type="button"
                className="btn-remove"
                value={id}
                onClick={() => {
                    deleteUserWord(id)
                    action[0]()
                }}
            >
                Удалить
            </button>
        )
    }
    return (
        <div className="btn-card-control">
            <button
                type="button"
                className="btn-add"
                value={id}
                onClick={() => {
                    createUserWord(id, word)
                    action[1]()
                }}
            >
                Добавить в сложные
            </button>
            <button
                type="button"
                className="btn-remove"
                value={id}
                onClick={() => {
                    easyUserWord(id, word2)
                    action[2]()
                }}
            >
                Изучено
            </button>
        </div>
    )
}

export default ButtonGroup
