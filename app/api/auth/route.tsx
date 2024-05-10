
import { createSession, deleteSession } from "@/app/services/sessionservice";
import { NextResponse } from "next/server";
import { SetSessionData, SignIn } from "@/app/services/auth0service";
import { cookies } from "next/headers";




export async function POST(request: Request) {
    const {email, password} = await request.json()
    const res = await SignIn({email: email, password: password});

    if (res.error){
        return NextResponse.json({error: res.error, error_description: res.error_description, status: 403})
    }

    const token = res.access_token;
    const id = res.id_token;
    const expiresIn = res.expires_in;
    createSession(token, id, expiresIn);
    return NextResponse.json({message: "Success", status: 200})

}


export async function GET() {
    
    const session = JSON.parse(cookies().get('session')?.value.toString() || '{}')
    if (session.token){
        const res = await SetSessionData(session.token);
        return NextResponse.json(res, {status: 200});
    }
    return NextResponse.json({message: "Unauthorized", status: 401})
}


export async function DELETE() {
    const session = JSON.parse(cookies().get('session')?.value.toString() || '{}')
    if (session.token){
        deleteSession();
        return NextResponse.json({message: "Session Deleted", status: 200})
    }
    return NextResponse.json({message: "Unauthorized", status: 401})
}