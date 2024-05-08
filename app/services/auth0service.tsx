

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



    async function SignUp(props:SignUpProps)
    {
        let body = {
            client_id: auth0client,
            email: props.email,
            password: props.password,
            username: props.nickname,
            connection: 'Username-Password-Authentication',
        }

        let response  = await SendRequest('dbconnections/signup', 'POST', body);
        return ParseResponse(response, 'json');
    }

    async function SignIn(props:SignInProps)
    {
        let body = {
            client_id: auth0client,
            username: props.email,
            password: props.password,
            connection: 'Email-Password-Authentication',
            grant_type: 'password',
            organization: ''
        }

        let response = await SendRequest('oauth/token', 'POST', body);
        return ParseResponse(response, 'json');
    }

    async function  ResetPassword(email:string)
    {
        let body = {
            client_id: auth0client,
            email: email,
            connection: 'Username-Password-Authentication',
            organization: ''
        }

        let response = await SendRequest('dbconnections/change_password', 'POST', body);
        return ParseResponse(response, 'text');
       
    }

    export async function SetSessionData(token:string)
    {

        let headers = {
            Authorization: `Bearer ${token}`
        }

        let body = {
            
        }
       
        let response = await SendRequest('userinfo', 'GET', body, headers);
        return ParseResponse(response, 'json');
    }

    async function SendRequest(route:string, method:string, body:any, headers?:any)
    {
        const response = await fetch(`https://${auth0domain}/${route}`, {
            method: method,
            headers: headers ? headers : { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(body)
        });
        
        return response;
    }

    async function ParseResponse(response:Response, awaitedData:string)
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






