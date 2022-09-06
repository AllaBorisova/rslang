export async function loginUser(credentials) {
    const rawResponse = await fetch('https://teamwork-rs.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    const content = await rawResponse.json()
    return content
}

export async function signUpUser(credentials) {
    await fetch('https://teamwork-rs.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    // const content = await rawResponse.json()
    return loginUser(credentials)
}

export async function getUser() {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        },
    })

    const content = await rawResponse.json()
    return content
}

export async function updateUser(credentials) {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    const content = await rawResponse.json()
    return content
}

export async function getUserStatistic() {
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}/statistics`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        },
    })

    const content = await rawResponse.json()
    return content
}

export const createUserWord = async (userId, wordId, token, optional) => {
    await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ difficulty: 'normal', optional }),
    })
    // const content = await rawResponse.json()
}

export const getUserWord = async (userId, wordId, token) => {
    try {
        const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })
        const content = await rawResponse.json()

        return content
    } catch (e) {
        return false
    }
}

export const changeUserWord = async (userId, wordId, token, optional) => {
    try {
        const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ difficulty: 'easy', optional }),
        })
        const content = await rawResponse.json()
        return content
    } catch (e) {
        return false
    }
}

export const getUserAggregatedWords = async (userId, token) => {
    try {
        const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/aggregatedWords`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })
        const content = await rawResponse.json()

        return content
    } catch (e) {
        return false
    }
}
