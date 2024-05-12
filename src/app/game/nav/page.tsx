'use client';

import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";

import { useSession } from "next-auth/react";










export default function Nav() {
    
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/auth/signin');
        },
      });

    
    return (
        <FmNavigation username={session.data?.user?.email} picture="/img/logo_transparent.png" />
    );
}


Nav.requireAuth = true;