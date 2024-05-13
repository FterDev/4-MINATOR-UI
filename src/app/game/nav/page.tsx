'use client';

import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";

import { useSession } from "next-auth/react";











export default  function Nav() {
    
    const session :any = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/auth/signin');
        },
        
      });


      console.log(session.data?.token?.user.stsTokenManager.accessToken);
      
      
    
    return (
      
    
        <FmNavigation username={session.data?.user?.email} picture="/img/logo_transparent.png" />
    );
}


Nav.requireAuth = true;