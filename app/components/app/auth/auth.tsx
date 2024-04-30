import React from 'react';
import './auth.css';
import FmCard from '../../ui/fmcard/fmcard';
import { Flex, Typography } from 'antd';
import Image from 'next/image';


interface AuthProps {
    children?: React.ReactNode;
    text : string;
}

let Auth : React.FC<AuthProps> = ({ children, text }) => {
    return (
        <div className="auth">
            <FmCard className="auth-card">
                <Flex justify='center'>
                    <Image src="/img/logo_transparent.png" alt="logo" width={0} height={0} sizes="100vw" className="auth-logo"/>
                </Flex>
                <Flex justify='center' className='auth-text-container'>
                    <label className='auth-text'>
                        {text}
                    </label>
                </Flex>
                <Flex justify='center' vertical className='auth-children'>
                    {children}
                </Flex>
            </FmCard>
        </div>
    );
}

export default Auth;