'use client'

import Auth from "@/app/components/app/auth/auth";
import PasswordValidationProvider, { PasswordValidationResponse, PasswordValidatorCriteria } from "@/app/components/app/validations/passwordvalidationprovider";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import FmPasswordValidator from "@/app/components/ui/fmpasswordvalidator/fmpasswordvalidator";
import { LoadingOutlined } from "@ant-design/icons";


import React, { FormEvent, useState } from "react";
import { z } from "zod";



export default function SignUp()
{

    
    const [error, setError] = useState<string | null>(null);
    const [nicknameError , setNicknameError] = useState<string | null>(null);
    const [emailError , setEmailError] = useState<string | null>(null);
    const [passwordValidatorDisplay , setPasswordValidatorDisplay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = new Promise(res => setTimeout(res, 3000));

    const nickname = document.querySelector<HTMLInputElement>("#nickname");
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");


    const pwCriteria:PasswordValidatorCriteria = {
        min: 8,
        max: 32,
        hasNumber: true,
        hasSpecial: true,
        hasUpperLowerCase: true
    };

    let pwErrors:PasswordValidationResponse = {
        error: false,
        lengthError: false,
        hasNumberError: false,
        hasSpecialError: false,
        hasUpperLowerCaseError: false
    };

    const pwProvider = new PasswordValidationProvider(pwCriteria);


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

    function showPasswordValidator()
    {
        setPasswordValidatorDisplay(true);
    }

    function validatePassword()
    {
        pwErrors = pwProvider.validatePassword(password?.value);
    }



    

    return (
        
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value="" placeholder="FluffyUnicorn" onBlur={validateNickname} isErrored={nicknameError!=null} errorText={nicknameError} type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" onBlur={validateEmail} isErrored={emailError!=null} errorText={emailError} type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" onBlur={showPasswordValidator} type="password" textAlign="center" />
                {passwordValidatorDisplay ? <FmPasswordValidator criteria={pwCriteria} errors={pwErrors} /> : null}
                <FmButton text={loading ? <LoadingOutlined /> : "Sign Up"} className="signin-button" isDisabled={loading} submmit/>
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}