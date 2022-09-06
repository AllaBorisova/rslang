import { useEffect, useState } from 'react'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

const CheckStatus = (id) => {
    const { userId, token } = GetStorage('userData', '')[0]
    const [status, setStatus] = useState(undefined)
    useEffect(() => {
        const CheckWord = async () => {
            await fetch(`${USER_URL}${userId}/words`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((data) => data.json())
                .then((result) => {
                    const filtered = result.filter((item) => item.wordId === id)
                    if (filtered.length !== 0) {
                        setStatus(filtered[0].difficulty)
                    }
                })
                .catch(() => {})
        }
        CheckWord()
    }, [token, userId])
    return [status, setStatus]
}

export default CheckStatus
