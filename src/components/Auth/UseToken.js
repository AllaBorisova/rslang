import { useState } from 'react'

const getToken = () => {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)
    return userData?.token ? userData?.token : null
}

const getUserId = () => {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)
    return userData?.userId ? userData?.userId : null
}

export default function useToken() {
    const [token, setToken] = useState(getToken())
    const [userId, setUserId] = useState(getUserId())

    const saveUserData = (userToken) => {
        localStorage.setItem('userData', JSON.stringify(userToken))
        setToken(userToken.token)
        setUserId(userToken.userId)
    }
    const logout = () => {
        localStorage.removeItem('userData')
        setToken(null)
        setUserId(null)
    }

    return {
        setToken: saveUserData,
        token,
        logout,
        userId,
    }
}
