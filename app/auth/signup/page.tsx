'use client'

import Auth from "@/app/components/app/auth/auth";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import { LoadingOutlined } from "@ant-design/icons";


import React, { FormEvent, useState } from "react";
import { z } from "zod";



export default function SignUp()
{

    const [error, setError] = useState<string | null>(null);
    const [nicknameError , setNicknameError] = useState<string | null>(null);
    const [emailError , setEmailError] = useState<string | null>(null);
    const [passwordError , setPasswordError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = new Promise(res => setTimeout(res, 3000));

    const nickname = document.querySelector<HTMLInputElement>("#nickname");
    const email = document.querySelector<HTMLInputElement>("#email");


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

    function validateEmail()
    {
        if(email?.value === "" || email?.value == null)
        {
            setEmailError("Email is required!");
        }
        else
        {
            try
            {
                z.string().email().parse(email?.value);
                setEmailError(null);
            }
            catch(error)
            {
                setEmailError("Invalid e-mail address!");
            }
        }
    }


    


    function validateNickname()
    {
        if(nickname?.value === "" || nickname?.value == null)
        {
            setNicknameError("Nickname is required!");
        }
        else
        {
            try
            {
                z.string().min(3).max(32).parse(nickname?.value);
                setNicknameError(null);
            }
            catch(error)
            {
                setNicknameError("Nickname must be between 3 and 32 characters!");
            }
        }
    }



    

    return (
        
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value="" placeholder="FluffyUnicorn" onBlur={validateNickname} isErrored={nicknameError!=null} errorText={nicknameError} type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" onBlur={validateEmail} isErrored={emailError!=null} errorText={emailError} type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text={loading ? <LoadingOutlined /> : "Sign Up"} className="signin-button" isDisabled={loading} submmit/>
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}