'use client';
import { getDownloadURL, ref } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../firebase';
import { get } from 'firebase/database';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { setNickname, setSession } from '../slices/sessionSlice';
import FmLoading from '../components/ui/fmloading/fmloading';


async function getUserData(userId: string) {
  
  while(!userId) {
    await new Promise(r => setTimeout(r, 500));
  }

  
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const fileRef = await getDownloadURL(ref(storage, 'avatars/placeholder.webp'));


  if(docSnap.exists()) {
    
    return {docSnap, fileRef};
  }
  
    
}

export default function Layout({
    children 
  }: {
    children: React.ReactNode
  }) {

    const [loading, setLoading] = React.useState(true);

    const sessionData = useSelector((state: any) => state.session);
    const dispatch = useDispatch();
    const session :any = useSession({
      required: true,
      onUnauthenticated() {
        redirect('/auth/signin');
      },
      
    });


    const token = session.data?.token.user.stsTokenManager.accessToken;
    const userId = session.data?.token.user.uid;
    
    
    getUserData(userId).then((data : any) => {
      dispatch(setSession({
        userId: userId,
        token: token,
        nickname: data.docSnap?.data().nickname,
        email: data.docSnap?.data().email,
        picture: data.fileRef
      }));
      setLoading(false);
    });

    console.log(sessionData);

    

    
    
  
  

    return (
      <>
        {loading ? (<FmLoading></FmLoading>) : children}
        
      </>
    );
}

Layout.requireAuth = true;