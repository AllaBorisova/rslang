import { useState } from 'react'

export default function useToken() {
    // const getToken = () => {
    //     const userDataString = localStorage.getItem('userData')
    //     const userData = JSON.parse(userDataString)
    //     return userData?.token
    // }

    const getUserId = () => {
        const userDataString = localStorage.getItem('userData')
        const userData = JSON.parse(userDataString)
        return userData?.userId
    }

    // const [ token, setToken ] = useState( getToken() );
    const [userId, setToken] = useState(getUserId())

    const saveUserData = (userToken) => {
        localStorage.setItem('userData', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        setToken: saveUserData,
        userId,
    }
}
