'use client';


import Auth from "@/app/components/app/auth/auth";
import FmButton from "@/app/components/ui/fmbutton/fmbutton";
import FmInput from "@/app/components/ui/fminput/fminput";
import FmLink from '@/app/components/ui/fmlink/fmlink';



export default function Forgot()
{
    return (
        <form>
            <Auth text="Please enter your e-mail to set a new password.">
                <FmInput id="email" name="email" title="E-Mail" value="" placeholder="fluffy@unicorn.com" type="email" textAlign="center" />
                <FmButton text="Reset" className="signin-button" submmit onClick={() => {}} />
                <FmLink text="Back to Sign In" href="/auth/signin" className="signin-link"/>
            </Auth>
        </form>
    );
}