
interface AuthProps {
    children?: React.ReactNode;
}

let Auth : React.FC<AuthProps> = ({ children }) => {
    return (
        <div className="auth">
            <div className="auth-form">
                {children}
            </div>
        </div>
    );
}

export default Auth;