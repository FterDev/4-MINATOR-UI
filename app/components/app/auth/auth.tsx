import React from 'react';
import './auth.css';
import FmCard from '../../ui/fmcard/fmcard';


interface AuthProps {
    children?: React.ReactNode;
}

let Auth : React.FC<AuthProps> = ({ children }) => {
    return (
        <div className="auth">
            <FmCard className="auth-card">
              
            </FmCard>
        </div>
    );
}

export default Auth;