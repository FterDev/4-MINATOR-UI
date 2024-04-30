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
            <Auth text="Please login to start playing.">
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text="Sign In" className="signin-button" submmit onClick={() => {}} />
                <FmLink text="Forgot your password?" href="/auth/forgot" className="signin-link"/>
                <FmLink text="No account? Create one!" href="/auth/signup" className="signin-link"/>
            </Auth>
        </form>
    );
}