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
    const rawResponse = await fetch('https://teamwork-rs.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    const content = await rawResponse.json()
    return await loginUser(credentials)
}

export async function getUser () {
    const userDataString = localStorage.getItem( 'userData' )
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        },
    } )
    
    const content = await rawResponse.json()
    console.log(content);
    return content
}

export async function updateUser ( credentials ) {
    const userDataString = localStorage.getItem( 'userData' )
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    const content = await rawResponse.json()
    return content
}

export async function getUserStatistic ( ) {
    const userDataString = localStorage.getItem( 'userData' )
    const userData = JSON.parse(userDataString)
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userData?.userId}/statistics`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
            'Content-Type': 'application/json',
        }
    } )
    
    const content = await rawResponse.json()
    return content
}

// function ShowNameUser (props) {
//     const name = await getUser( props.userId );
//     console.log( name );
//     return (
//         <div>123</div>
//     );
// }
