'use client'

import Auth from "@/app/components/app/auth/auth";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import { LoadingOutlined } from "@ant-design/icons";


import React, { FormEvent, useState } from "react";



export default function SignUp()
{

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = new Promise(res => setTimeout(res, 3000));


    async function handleSubmit(event: FormEvent<HTMLFormElement>)
    {
        try
        {
            setLoading(true)
            event.preventDefault();
            console.log("Sign Up");
            


        }
        catch(error)
        {
            
        }
        finally
        {
            delay.then(() => setLoading(false));
        }
    }



    

    return (
        
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value="" placeholder="FluffyUnicorn" type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text={loading ? <LoadingOutlined /> : "Sign Up"} className="signin-button" isDisabled={loading} submmit/>
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}