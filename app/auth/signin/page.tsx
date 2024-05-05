'use client';


import Auth from "@/app/components/app/auth/auth";
import EmailValidationProvider from "@/app/components/app/validations/emailvalidationprovider";
import PasswordValidationProvider from "@/app/components/app/validations/passwordvalidationprovider";
import ValidationErrorResponse from "@/app/components/app/validations/validationerrorresponse";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import Auth0Service from "@/app/services/auth0service";
import { useState } from "react";



export default function SignIn()
{


    const [error, setError] = useState<Boolean>(true);
    const [success, setSuccess] = useState<Boolean>(false);
    const [emailError , setEmailError] = useState<ValidationErrorResponse>(
        {
            errorText: null,
            isErrored: false
        }
    );
    const [passwordError , setPasswordError] = useState<ValidationErrorResponse>(
        {
            errorText: null,
            isErrored: false
        }
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const emailValidation = new EmailValidationProvider();
    const passwordValidation = new PasswordValidationProvider();
    const auth0service = new Auth0Service();

    return (
        <form>
            <Auth text="Please login to start playing.">
                <FmInput id="email" name="email" title="E-Mail" value={email} placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value={password} onBlur={} placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text="Sign In" className="signin-button" submmit onClick={() => {}} />
                <FmLink text="Forgot your password?" href="/auth/forgot" className="signin-link"/>
                <FmLink text="No account? Create one!" href="/auth/signup" className="signin-link"/>
            </Auth>
        </form>
    );
}