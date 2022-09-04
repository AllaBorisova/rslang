import { useState, useEffect } from 'react'
import GetStorage from './LocalStorage'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`
const GetDiffWords = () => {
    const { userId, token } = GetStorage('userData', '')[0]
    const [diff, SetDiff] = useState([])

    useEffect(() => {
        const getDiffList = async () => {
            const totalCount = await fetch(
                `${USER_URL}${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const count = await totalCount.json()
            const total = count[0].totalCount[0].count

            const Res = await fetch(
                `${USER_URL}${userId}/aggregatedWords?wordsPerPage=${total}&filter={"userWord.difficulty":"hard"}`,
                {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            const content = await Res.json()

            const res = content[0].paginatedResults

            SetDiff(res)
        }
        getDiffList()
    }, [])

    return [diff, SetDiff]
}

export default GetDiffWords
