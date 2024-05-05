'use client'

import Auth from "@/app/components/app/auth/auth";
import EmailValidationProvider from "@/app/components/app/validations/emailvalidationprovider";
import PasswordValidationProvider, { PasswordValidationResponse, PasswordValidatorCriteria } from "@/app/components/app/validations/passwordvalidationprovider";
import ValidationErrorResponse from "@/app/components/app/validations/validationerrorresponse";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import FmPasswordValidator from "@/app/components/ui/fmpasswordvalidator/fmpasswordvalidator";
import { LoadingOutlined } from "@ant-design/icons";


import React, { FormEvent, useState } from "react";
import { z } from "zod";

interface SignUpForm {
    nickname: string;
    email: string;
    password: string;
}



export default function SignUp()
{

    
    const [error, setError] = useState<string | null>(null);
    const [nicknameError , setNicknameError] = useState<string | null>(null);
    let [emailError , setEmailError] = useState<ValidationErrorResponse>(
        {
            errorText: null,
            isErrored: false
        }
    );


    const [passwordErrors , setPasswordErrors] = useState<PasswordValidationResponse>(
        {
            error: false,
            lengthError: true,
            hasNumberError: true,
            hasSpecialError: false,
            hasUpperLowerCaseError: true
        }
    );

    
    

    const [passwordValidatorDisplay , setPasswordValidatorDisplay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = new Promise(res => setTimeout(res, 3000));

    const nickname = document.querySelector<HTMLInputElement>("#nickname");
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");

    let formData:SignUpForm = {
        nickname: "",
        email: "",
        password: ""
    }


    const pwCriteria:PasswordValidatorCriteria = {
        min: 8,
        max: 32,
        hasNumber: true,
        hasSpecial: false,
        hasUpperLowerCase: true
    };



    const pwProvider = new PasswordValidationProvider(pwCriteria);
    const emailProvider = new EmailValidationProvider();


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
        setEmailError(emailProvider.validateEmail(email?.value));
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
        setPasswordErrors(pwProvider.validatePassword(password?.value));
    }



    

    return (
        
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value="" placeholder="FluffyUnicorn" onBlur={validateNickname} isErrored={nicknameError!=null} errorText={nicknameError} type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" onBlur={validateEmail} isErrored={emailError.isErrored} errorText={emailError.errorText} type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" onBlur={showPasswordValidator} onChange={validatePassword} isErrored={passwordErrors.error} type="password" textAlign="center" />
                {passwordValidatorDisplay ? <FmPasswordValidator criteria={pwCriteria} errors={passwordErrors} /> : null}
                <FmButton text={loading ? <LoadingOutlined /> : "Sign Up"} className="signin-button" isDisabled={loading} submmit/>
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}