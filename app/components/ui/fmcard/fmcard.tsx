
import React from "react";
import "./fmcard.css";


interface FmCardProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}



const FmCard : React.FC<FmCardProps> = ({ title, subtitle, children }) => {
    return (
        <div className="card card-bg">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{subtitle}</p>
            <div>{children}</div>
        </div>
    );
}

export default FmCard;