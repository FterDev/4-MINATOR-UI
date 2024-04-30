'use client';

import './page.css';
import Auth from "@/app/components/app/auth/auth";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';



export default function SignUp()
{
    return (
        <form>
            <Auth text="Please enter the required information to create an account.">
                <FmInput id="nickname" name="nickname" title="Nickname" value="" placeholder="FluffyUnicorn" type="text" textAlign="center" />
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text="Sign Up" className="signin-button" submmit onClick={() => {}} />
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}