import 'server-only';
import { cookies } from 'next/headers'
import { redirect } from 'next/dist/server/api-utils';




export async function createSession(token:string, id:string, expiresIn:number) {

    const session = {
        token: token,
        id: id,
        expiresAt: new Date().getTime() + expiresIn
    }
    const expiresAt = new Date().getTime() + expiresIn;

    cookies().set('session', JSON.stringify(session), {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}


export function deleteSession()
{
    cookies().delete('session');
}

