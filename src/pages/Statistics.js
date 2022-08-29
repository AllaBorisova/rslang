import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Statistics() {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)

    if (userData?.userId) {
        const [userStatistic, setUserStatistic] = useState([])

        useEffect(() => {
            const getStatistic = async () => {
                try {
                    const res = await axios.get(
                        `https://teamwork-rs.herokuapp.com/users/${userData?.userId}/statistics`,
                        {
                            headers: {
                                Authorization: `Bearer ${userData?.token}`,
                                Accept: 'application/json',
                            },
                        }
                    )
                    setUserStatistic(res.data)
                } catch (error) {
                    // throw new Error(error);
                }
            }
            getStatistic()
        }, [])

        return <h1>Статистика есть</h1>

        // return (
        //     <div>
        //         <h1>Статистика</h1>
        //         {userStatistic}
        //     </div>
        // );
    }
    return <h1>Статистика недоступна</h1>
}

export default Statistics
