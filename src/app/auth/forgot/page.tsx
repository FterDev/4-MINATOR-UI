'use client';
import Auth from "@/app/components/app/auth/auth";
import EmailValidationProvider from "@/app/components/app/validations/emailvalidationprovider";
import ValidationErrorResponse from "@/app/components/app/validations/validationerrorresponse";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import FmMessage from "@/app/components/ui/fmmessage/fmmessage";
import { app, auth } from "@/app/firebase";

import { LoadingOutlined } from "@ant-design/icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";




export default function Forgot()
{

    const [error, setError] = useState<Boolean>(true);
    const [success, setSuccess] = useState<Boolean>(false);
    const [emailError , setEmailError] = useState<ValidationErrorResponse>(
        {
            errorText: null,
            isErrored: false
        }
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const emailValidation = new EmailValidationProvider();
    

    function handleSubmit(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        setEmailError(emailValidation.validateEmail(email));
        if(emailError.isErrored)
        {
            setError(true);
            setLoading(false);
            return;
        }
        else
        {
            setError(false);
        }
        
        
        
        

        if(!error)
        {
            setLoading(true);
            sendPasswordResetEmail(auth, email);
            setSuccess(true);
        }
        
    }


    return (
        success ?
            <FmMessage type="success" message="Password reset link has been sent to your e-mail!">
                <FmLink href="/auth/signin" text="Back to Sign In" />
            </FmMessage>
        :
        <form onSubmit={handleSubmit}>
            <Auth text="Please enter your e-mail to set a new password.">
                <FmInput id="email" name="email" title="E-Mail" value={email} onChange={(e) => setEmail(e)} onBlur={(e) => setEmailError(emailValidation.validateEmail(e))} isErrored={emailError.isErrored} errorText={emailError.errorText} placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmButton text={loading ? <LoadingOutlined /> : "Reset"} isDisabled={loading} className="signin-button" submmit />
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>     
    );
}