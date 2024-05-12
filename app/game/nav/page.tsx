'use client';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setGravatar } from "@/app/states/userDataSlice";
import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";
import { use, useEffect, useState } from "react";
import FmLoading from "@/app/components/ui/fmloading/fmloading";
import { useSession } from "next-auth/react";










export default function Nav() {
    
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/auth/signin');
        },
      });

    const [loading, setLoading] = useState<boolean>(true);

    
    
    
    
    if(loading) return <FmLoading />;
    return (
        <FmNavigation username={session.data?.user?.email} picture="/img/logo_transparent.png" />
    );
}


Nav.requireAuth = true;