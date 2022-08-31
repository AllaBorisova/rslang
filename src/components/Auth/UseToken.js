import { useState } from 'react'

export default function useToken () {
    const getToken = () => {
        const userDataString = localStorage.getItem('userData')
        const userData = JSON.parse( userDataString )
        return userData?.token ? userData?.token : null
    }

    const [ token, setToken ] = useState( getToken() )
   
    const saveUserData = (userToken) => {
        localStorage.setItem('userData', JSON.stringify(userToken))
        setToken(userToken.token)
    }
    const logout = () => {
        localStorage.removeItem('userData')
        setToken(null)
    }

    return {
        setToken: saveUserData,
        token,
        logout
    }
}
