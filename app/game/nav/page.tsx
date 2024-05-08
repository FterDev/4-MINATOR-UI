'use client';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setGravatar } from "@/app/states/userDataSlice";



function getUserData () {
    return fetch('/api/auth', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}





export default function Nav() {
    
    const userData = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();

    if (!userData.username) {
        console.log('fetching user data');
    }


    return (
        <h1>Nav!</h1>
    );
}