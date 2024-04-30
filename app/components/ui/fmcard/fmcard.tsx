
import React from "react";
import "./fmcard.css";


interface FmCardProps {
    title?: string;
    subtitle?: string;
    className?: string;
    children?: React.ReactNode;
}



let FmCard : React.FC<FmCardProps> = ({ title, subtitle, className, children }) => {
    return (
        <div className={"fm-card fm-card-bg" + className}>
            <h2 className="fm-card-title">{title}</h2>
            <p className="fm-card-subtitle">{subtitle}</p>
            <div>{children}</div>
        </div>
    );
}

export default FmCard;