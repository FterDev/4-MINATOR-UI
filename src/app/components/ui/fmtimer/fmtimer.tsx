'use client';
import { useEffect, useState } from "react";
import './fmtimer.css';




interface IFmTimerProps {
    targetTime: Date;
}

function getTimezoneOffset(): number {
    const date = new Date();
    return date.getTimezoneOffset();
}



export const FmTimer: React.FC<IFmTimerProps> = (props) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [timeLeftString, setTimeLeftString] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = props.targetTime.getTime() - now;

            setTimeLeft(distance);
            setTimeLeftString(new Date(distance).toISOString().substr(14, 5));
        }, 1000);

        return () => clearInterval(interval);
    }, [props.targetTime]);

    return (
        <div>
            {timeLeftString}
        </div>
    );
};

