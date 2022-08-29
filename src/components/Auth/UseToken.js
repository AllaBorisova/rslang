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
    const [isAuth, setIsAuth] = useState(false)
    // const [ token, setToken ] = useState( getToken() );
    const [userId, setToken] = useState(getUserId())
    const saveUserData = (userToken) => {
        localStorage.setItem('userData', JSON.stringify(userToken))
        setIsAuth(true)
        setToken(userToken.token)
    }
    const logout = () => {
        // setIsAuth(false)

        localStorage.removeItem('userData')
        setToken(null)
        setIsAuth(false)
    }

    return {
        setToken: saveUserData,
        userId,
        logout,
        isAuth,
    }
}
