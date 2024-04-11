
import React from "react";
import "./fmcard.css";


interface FmCardProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}



const FmCard : React.FC<FmCardProps> = ({ title, subtitle, children }) => {
    return (
        <div className="fm-card fm-card-bg">
            <h2 className="fm-card-title">{title}</h2>
            <p className="fm-card-subtitle">{subtitle}</p>
            <div>{children}</div>
        </div>
    );
}

export default FmCard;