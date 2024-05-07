import Auth0Service from "@/app/services/auth0service";
import { createSession } from "@/app/services/sessionservice";
import { message } from "antd";
import { stat } from "fs";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";
import { json } from "stream/consumers";



export async function POST(request: Request) {
    const {email, password} = await request.json()
    const auth0service = new Auth0Service();
    const res = await auth0service.signIn({email: email, password: password});

    if (res.error){
        return NextResponse.json({error: res.error, error_description: res.error_description, status: 403})
    }

    const token = res.access_token;
    const id = res.id_token;
    const expiresIn = res.expires_in;
    createSession(token, id, expiresIn);
    return NextResponse.json({message: "Success", status: 200})

}