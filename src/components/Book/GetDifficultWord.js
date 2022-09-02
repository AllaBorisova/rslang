import { useEffect, useState } from 'react'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function GetDiffWords(user) {
    const { userId, token } = user
    const [diff, setDiff] = useState([])

    useEffect(() => {
        const diffWordList = async () => {
            const Res = await fetch(`${USER_URL}${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`, {
                method: 'GET',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            const content = await Res.json()
            const res = content[0].paginatedResults
            setDiff(res)
        }
        diffWordList()
    }, [])
    return [diff, setDiff]
}

export default GetDiffWords
