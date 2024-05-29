'use client';

import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";

import { useSession } from "next-auth/react";
import { useSelector } from 'react-redux';











export default  function Nav() {
    
  const session :any = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    }
  });

  const sessionData = useSelector((state: any) => state.session);
      
      
    
    return (
      
    
        <FmNavigation username={sessionData.nickname} picture={sessionData.picture} />
    );
}


Nav.requireAuth = true;