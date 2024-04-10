
import React from "react";
import "./fmcard.css";


interface FmCardProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}



function FmCard({ title, subtitle, children }: FmCardProps) {
    return (
        <div className="card card-bg">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{subtitle}</p>
            <div>{children}</div>
        </div>
    );
}

export default FmCard;