'use client';
import React from 'react';
import { Provider } from 'react-redux';
import rootRedux from '../store';

export default function Layout({
    children 
  }: {
    children: React.ReactNode
  }) {


    return (
      <Provider store={rootRedux}>
        {children}
      </Provider>
    );
}
