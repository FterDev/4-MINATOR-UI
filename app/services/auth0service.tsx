

const auth0domain = process.env.NEXT_PUBLIC_AUTH_ZERO_DOMAIN
const auth0client = process.env.NEXT_PUBLIC_AUTH_ZERO_CLIENT_ID
const auth0secret = process.env.NEXT_PUBLIC_AUTH_ZERO_CLIENT_SECRET


export interface SignUpProps 
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


export default class Auth0Service
{
    public async signUp(props:SignUpProps)
    {
        let body = {
            client_id: auth0client,
            email: props.email,
            password: props.password,
            username: props.nickname,
            connection: 'Username-Password-Authentication',
        }

        let result = await this.sendRequest('dbconnections/signup', 'POST', body);
        return result;
    }

    private async sendRequest(route:string, method:string, body:any)
    {
        const response = await fetch(`https://${auth0domain}/${route}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
}



