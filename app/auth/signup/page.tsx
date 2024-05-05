'use client'

import Auth from "@/app/components/app/auth/auth";
import EmailValidationProvider from "@/app/components/app/validations/emailvalidationprovider";
import NicknameValidationProvider from "@/app/components/app/validations/nicknamevaltidationprovider";
import PasswordValidationProvider, { PasswordValidationResponse, PasswordValidatorCriteria } from "@/app/components/app/validations/passwordvalidationprovider";
import ValidationErrorResponse from "@/app/components/app/validations/validationerrorresponse";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import FmPasswordValidator from "@/app/components/ui/fmpasswordvalidator/fmpasswordvalidator";
import { LoadingOutlined } from "@ant-design/icons";


import React, { FormEvent, useState } from "react";
import { set, z } from "zod";

interface SignUpForm {
    nickname: string;
    email: string;
    password: string;
}



export default function SignUp()
{

    
    const [error, setError] = useState<Boolean>(false);
    const [nicknameError , setNicknameError] = useState<ValidationErrorResponse>(
        {
            errorText: null,
            isErrored: false
        }
    );

    const [emailError , setEmailError] = useState<ValidationErrorResponse>(
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
    

    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
    const nicknameProvider = new NicknameValidationProvider();



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
          
        }
    }

    function validateEmail()
    {
        setEmailError(emailProvider.validateEmail(email));
    }

    function validateNickname()
    {
        setNicknameError(nicknameProvider.validateNickname(nickname));
    }

    function showPasswordValidator()
    {
        setPasswordValidatorDisplay(true);
    }

    function validatePassword(e : React.ChangeEvent<HTMLInputElement> | any)
    {
        setPassword(e);
        setPasswordErrors(pwProvider.validatePassword(password));
    }



    

    return (
        
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value={nickname} placeholder="FluffyUnicorn" onBlur={validateNickname} onChange={(e) => setNickname(e)} isErrored={nicknameError.isErrored} errorText={nicknameError.errorText} type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value={email} placeholder="fluffy@unicorn.com" onBlur={validateEmail} onChange={(e) => setEmail(e)} isErrored={emailError.isErrored} errorText={emailError.errorText} type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value={password} placeholder="●●●●●●●" onBlur={showPasswordValidator} onChange={(e) => validatePassword(e)} isErrored={passwordErrors.error} type="password" textAlign="center" />
                {passwordValidatorDisplay ? <FmPasswordValidator criteria={pwCriteria} errors={passwordErrors} /> : null}
                <FmButton text={loading ? <LoadingOutlined /> : "Sign Up"} className="signin-button" isDisabled={loading} submmit/>
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}