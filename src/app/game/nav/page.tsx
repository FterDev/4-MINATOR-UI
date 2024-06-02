'use client';

import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";

import { useSession } from "next-auth/react";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProfilePicture } from '@/app/services/firefs';




export default  function Nav() {
    
  const session :any = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    }
  });

  const sessionData = useSelector((state: any) => state.session);
      
    const [picture, setPicture] = useState<string>('');
    

    useEffect(() => {
      getProfilePicture(sessionData.userId).then((res) => {
        setPicture(res!);
      });
    }, []);


    return (
      
    
        <FmNavigation username={sessionData.nickname} picture={picture} />
    );
}


Nav.requireAuth = true;