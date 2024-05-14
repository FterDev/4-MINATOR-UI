

import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({
    children 
  }: {
    children: React.ReactNode
  }) {

    const cookiesStore = cookies();
    const session = cookiesStore.get('next-auth.session-token');

    if(session)
    {
      redirect('/game/nav');
    }
    
    return (
        <>
            {children}
        </>
    );
}