'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Layout({
    children 
  }: {
    children: React.ReactNode
  }) {


    const session = useSelector((state: any) => state.session);
    const dispatch = useDispatch();


    return (
      <>
        {children}
      </>
    );
}
