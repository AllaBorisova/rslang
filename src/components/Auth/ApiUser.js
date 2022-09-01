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

export const createUserWord = async (userId, wordId, word, token) => {
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({ difficulty: 'easy', optional: { game: 'sprint'} })
        
    });
    const content = await rawResponse.json();
  
    console.log(content);
  }
  
//   createUserWord({
//     userId: "5ec993df4ca9d600178740ae",
//     wordId: "5e9f5ee35eb9e72bc21af716",
//     word: { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
//   });

export const getUserWord = async ({ userId, wordId, token }) => {
    const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };

// export async function createUserWord ( userId, token, word ) {
//     console.log(word)
//     try {
//         const config = {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(word)
//         }
//         const response = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${word.id}`, config)
//         //const json = await response.json()
//         if (response.ok) {
//             //return json
//             return response
//         } else {
//             //
//         }
//     } catch (error) {
//         return error
//     }
//     // console.log(token)
//     // const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/`, {
//     //     method: 'POST',
//     //     withCredentials: true,
//     //     headers: {
//     //         'Authorization': `Bearer ${token}`,
//     //         'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(word),
//     // }).then
//     // const content = await rawResponse.json()
//     // return content
// }

// function ShowNameUser (props) {
//     const name = await getUser( props.userId );
//     console.log( name );
//     return (
//         <div>123</div>
//     );
// }
