'use client';
import Auth from "@/app/components/app/auth/auth";
import EmailValidationProvider from "@/app/components/app/validations/emailvalidationprovider";
import PasswordValidationProvider from "@/app/components/app/validations/passwordvalidationprovider";
import ValidationErrorResponse from "@/app/components/app/validations/validationerrorresponse";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';
import { LoadingOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { useState } from "react";







    

    

export default function SignIn()
{

    const [error, setError] = useState<Boolean>(true);
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
    const passwordValidation = new PasswordValidationProvider(null);

    function checkAllInputs() {
        setEmailError(emailValidation.validateEmail(email));
        setPasswordError(passwordValidation.validateOnlyEmpty(password));

        if (emailError.isErrored || passwordError.isErrored) {
            setError(true);
        } else {
            setError(false);
        }
    }

    async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    
        setLoading(true);
        event.preventDefault();
        checkAllInputs();
        
            if (!error) {
                signIn('credentials', {email: email, password: password, redirect: true, callbackUrl: '/game/nav'}).then((response) => {
                    console.log(response);
                    setLoading(false);
                });
            }

            setLoading(false);   
            
        }


    return (
        <form onSubmit={handleSignIn}>
            <Auth text="Please login to start playing.">
                <FmInput id="email" name="email" title="E-Mail" value={email} onBlur={(e) => setEmailError(emailValidation.validateEmail(e))} onChange={(e) => setEmail(e)} isErrored={emailError.isErrored} errorText={emailError.errorText} placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value={password} onBlur={(e) => setPasswordError(passwordValidation.validateOnlyEmpty(e))} onChange={(e) => setPassword(e)} isErrored={passwordError.isErrored} errorText={passwordError.errorText} placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text={loading ? <LoadingOutlined /> : "Sign in"} isDisabled={loading} className="signin-button" submmit />
                <FmLink text="Forgot your password?" href="/auth/forgot" className="signin-link"/>
                <FmLink text="No account? Create one!" href="/auth/signup" className="signin-link"/>
            </Auth>
        </form>
    );
}

