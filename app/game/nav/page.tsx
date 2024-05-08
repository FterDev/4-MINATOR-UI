'use client';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setGravatar } from "@/app/states/userDataSlice";
import FmNavigation from "@/app/components/ui/fmnavigation/fmnavigation";
import { use, useEffect, useState } from "react";
import FmLoading from "@/app/components/ui/fmloading/fmloading";










export default function Nav() {
    
    const userData = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    
    
    useEffect(() => {
        fetch("/api/auth")
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUsername(data.nickname));
                dispatch(setGravatar(data.picture));
                setLoading(false);
            });
    
    }, []);
    
    if(loading) return <FmLoading />;

 


    return (
      
        <FmNavigation username={userData.username} picture={userData.gravatar} />
    );
}