'use client';

import './page.css';
import Auth from "@/app/components/app/auth/auth";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";



export default function SignUp()
{
    return (
        <form>
            <Auth text="Please login to start playing.">
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmInput id="password" name="password" title="Password" value="" placeholder="●●●●●●●" type="password" textAlign="center" />
                <FmButton text="Sign In" className="signin-button" submmit onClick={() => {}} />
                
            </Auth>
        </form>
    );
}