
import React from "react";
import Link from "next/link";
import "./fmlink.css";


interface FmLinkProps {
    text: string;
    href: string;
    className?: string;
}


let FmLink: React.FC<FmLinkProps> = ({ text, href, className }) => {
    return (
        <Link href={href} className={` ${className}`}>{text}</Link>
    );
};

export default FmLink;