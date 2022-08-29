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
    const content = await rawResponse.json();
    return await loginUser(credentials)
}

// async function getUser(userId) {
//     const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users${userId}`, {
//         method: 'GET',
//     })
//     const content = await rawResponse.json()
//     return content
// }

// function ShowNameUser (props) {
//     const name = await getUser( props.userId );
//     console.log( name );
//     return (
//         <div>123</div>
//     );
// }
