

const auth0domain = process.env.AUTH_ZERO_DOMAIN
const auth0client = process.env.AUTH_ZERO_CLIENT_ID
const auth0secret = process.env.AUTH_ZERO_CLIENT_SECRET


interface SignUpProps 
{
    email: string;
    password: string;
    nickname: string;
}

interface SignInProps 
{
    email: string;
    password: string;
}





export async function signUp(props:SignUpProps)
{      
        const response = await fetch(`https://${auth0domain}/dbconnections/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: auth0client,
                email: props.email,
                password: props.password,
                username: props.email,
                connection: 'Username-Password-Authentication',
                user_metadata: { nickname: props.nickname }
            })
        });
        const data = await response.json();
        console.log(data);
        return data;
}


export async function signIn()
{
    
}


export async function signOut()
{
    
}


export async function refresh()
{
    
}