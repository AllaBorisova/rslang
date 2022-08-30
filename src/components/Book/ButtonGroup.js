import React from 'react'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function ButtonGroup({ id }) {
    const { userId, token } = GetStorage('userData', {})[0]
    const createUserWord = async (wordId, word) => {
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
                throw new Error(error.message)
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

    const word = { difficulty: 'hard', optional: { testFieldString: 'test', testFieldBoolean: true } }

    return (
        <div className="btn-card-control">
            <button
                type="button"
                className="btn-add"
                value={id}
                onClick={() => {
                    createUserWord(id, word)
                }}
            >
                Добавить в сложные
            </button>
            <button
                type="button"
                className="btn-remove"
                value={id}
                onClick={() => {
                    deleteUserWord(id)
                }}
            >
                Удалить
            </button>
        </div>
    )
}

export default ButtonGroup
