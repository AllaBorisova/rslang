import React from 'react'
import axios from 'axios'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function ButtonGroup(props) {
    const { id, user, dict, action } = props
    const { userId, token } = GetStorage('userData', '')[0]

    const CheckWord = async (Id) => {
        
            const res = await fetch(`${USER_URL}${userId}/words/${Id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
            const response = await res.status
            if (res.status!=='200')
            console.log(response)
        

        const data = await res.json()
        return data.difficulty
    }
    const createUserWord = async (wordId, word) => {
        const status = await CheckWord(wordId)
        console.log(status)
        await fetch(`${USER_URL}${userId}/words/${wordId}`, {
            method: 'POST',
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
                console.log(error)
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
            method: 'PUT',
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
    const UpdateEasyUserWord = async (wordId, word2) => {
        await fetch(`${USER_URL}${userId}/words/${wordId}`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word2),
        })
            .then((res) => res.status)
            .catch((error) => {
                throw new Error(error.message)
            })
    }

    const word = { difficulty: 'hard', optional: { testFieldString: 'test', testFieldBoolean: true } }
    const word2 = { difficulty: 'easy', optional: { testFieldString: 'test', testFieldBoolean: true } }
    if (dict) {
        return (
            <button
                type="button"
                className="btn-remove"
                value={id}
                onClick={() => {
                    deleteUserWord(id)
                    action[0]()
                    // CheckWord(id)
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
                    // CheckWord(id)
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
                    CheckWord(id)
                    action[2]()
                }}
            >
                Изучено
            </button>
        </div>
    )
}

export default ButtonGroup
