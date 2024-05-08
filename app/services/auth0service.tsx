

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

        let response  = await this.sendRequest('dbconnections/signup', 'POST', body);
        return this.parseResponse(response, 'json');
    }

    public async signIn(props:SignInProps)
    {
        let body = {
            client_id: auth0client,
            username: props.email,
            password: props.password,
            connection: 'Email-Password-Authentication',
            grant_type: 'password',
            organization: ''
        }

        let response = await this.sendRequest('oauth/token', 'POST', body);
        return this.parseResponse(response, 'json');
    }

    public async resetPassword(email:string)
    {
        let body = {
            client_id: auth0client,
            email: email,
            connection: 'Username-Password-Authentication',
            organization: ''
        }

        let response = await this.sendRequest('dbconnections/change_password', 'POST', body);
        return this.parseResponse(response, 'text');
       
    }

    public async setSessionData(id:string)
    {
        let body = {
            id_token: id
        }

        let response = await this.sendRequest('tokeninfo', 'POST', body);
        return this.parseResponse(response, 'json');
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
        
        return response;
    }

    private async parseResponse(response:Response, awaitedData:string)
    {
        if(awaitedData === 'text')
        {
            return await response.text();
        }
        if(awaitedData === 'json')
        {
            return await response.json();
        }
        
        return Error('No data type specified');
    }
}





