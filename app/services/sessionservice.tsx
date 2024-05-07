import 'server-only';
import { cookies } from 'next/headers';




export async function createSession(token:string, id:string, expiresIn:number) {

    const session = {
        token: token,
        id: id,
        expiresAt: new Date().getTime() + expiresIn
    }
    const expiresAt = new Date().getTime() + expiresIn * 1000;

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

