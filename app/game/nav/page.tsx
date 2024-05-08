'use client';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setGravatar } from "@/app/states/userDataSlice";









export default function Nav() {
    
    const userData = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();

    if (!userData.username) {
        fetch('/api/auth', { method: 'GET' }).then(res => res.json()).then(data => {
            dispatch(setUsername(data.nickname));
            dispatch(setGravatar(data.picture));
        });
    }


    return (
        <h1>Nav! - Welcome {userData.username}</h1>
    );
}