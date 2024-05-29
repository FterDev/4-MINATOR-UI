'use client';

import { redirect } from 'next/navigation';
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";

import { useSession } from "next-auth/react";
import test from 'node:test';











export default  function Nav() {
    
    
      
      
    
    return (
      
    
        <FmNavigation username={"test"} picture="/img/logo_transparent.png" />
    );
}


Nav.requireAuth = true;