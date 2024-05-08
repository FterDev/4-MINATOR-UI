'use client';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setGravatar } from "@/app/states/userDataSlice";









export default function Nav() {
    
    const userData = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();


    function getUserData () {
        return fetch('/api/auth', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    if (!userData.username) {
        console.log('fetching user data');
    }


    return (
        <h1>Nav!</h1>
    );
}