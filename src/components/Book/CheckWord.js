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
                .catch((e) => {
                    console.log('fail')
                })
        }
        CheckWord()
    }, [token, userId])
    return [status, setStatus]
}

// const CheckPage = (page, group) => {
//     const { userId, token } = GetStorage('userData', '')[0]
//     const [active, SetActive] = useState(false)
//     useEffect(() => {
//         const CheckThePage = async () => {
//             await fetch(
//                 `${USER_URL}${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter={"$and":[{"userWord.difficulty":"hard", "userWord.difficulty":"easy"}]}`,
//                 {
//                     method: 'GET',
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             )
//                 .then((data) => data.json())
//                 .then((result) => {
//                     const { count } = result[0].totalCount[0]
//                     console.log(count)
//                     if (count === 20) {
//                         SetActive(true)
//                     }

//                 })
//                 .catch((e) => {
//                     console.log('fail')
//                 })
//         }
//         CheckThePage()
//     }, [token, userId])

//     return [active, SetActive]
// }

export default CheckStatus
