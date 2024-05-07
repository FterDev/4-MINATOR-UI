import Auth0Service from "@/app/services/auth0service";
import { createSession } from "@/app/services/sessionservice";
import { NextApiRequest, NextApiResponse } from "next";



export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const auth0service = new Auth0Service();
    const response = await auth0service.signIn({ email: email, password: password });
    if (response.error == "invalid_grant") {
        return res.status(401).json(response);
    }
    if (response.error == "access_denied") {
        return res.status(401).json(response);
    }
    await createSession(response.access_token, response.id_token, response.expires_in);
    return res.status(200);
}