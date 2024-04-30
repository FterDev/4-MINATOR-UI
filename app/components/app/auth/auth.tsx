import React from 'react';
import './auth.css';
import FmCard from '../../ui/fmcard/fmcard';
import { Flex } from 'antd';
import Image from 'next/image';


interface AuthProps {
    children?: React.ReactNode;
}

let Auth : React.FC<AuthProps> = ({ children }) => {
    return (
        <div className="auth">
            <FmCard className="auth-card">
                <Flex justify='center'>
                    <Image src="/img/logo_transparent.png" alt="logo" width={0} height={0} sizes="100vw" className="auth-logo"/>
                </Flex>    
            </FmCard>
        </div>
    );
}

export default Auth;