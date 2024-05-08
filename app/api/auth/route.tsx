
import { createSession } from "@/app/services/sessionservice";
import { NextResponse } from "next/server";
import { SignIn } from "@/app/services/auth0service";




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