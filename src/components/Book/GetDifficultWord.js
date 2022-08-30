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
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// const USER_URL = `https://teamwork-rs.herokuapp.com/users/`
// const BASE_URL = `https://teamwork-rs.herokuapp.com/words/`

// function GetDiffWords(user) {
//     const { userId, token } = user
//     const [diff, setDiff] = useState([])

//     useEffect(() => {
//         const diffWordList = async () => {
//             const Res = await fetch(`${USER_URL}${userId}/words/`, {
//                 method: 'GET',
//                 withCredentials: true,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: 'application/json',
//                 },
//             })
//             const content = await Res.json()
//             const result = await Promise.all(
//                 content.map(async (item) => {
//                     const diffWord = await axios.get(`${BASE_URL}${item.wordId}`)
//                     return diffWord.data
//                 })
//             )
//             setDiff(result)
//         }
//         diffWordList()
//     }, [])
//     return [diff, setDiff]
// }

// export default GetDiffWords
