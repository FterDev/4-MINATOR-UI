
import React from "react";

import "./fmmessage.css";

import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import { CheckCircleOutline } from "@mui/icons-material";


interface FmMessageProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    children?: React.ReactNode;
}


let FmMessage: React.FC<FmMessageProps> = ({ type, message, children }) => {
    return (
        <Flex justify="center" align="center" className="fm-message-container">
            <FmCard className="fm-message">
                <Flex justify="center">
                    {type === 'success' && <CheckCircleOutline className="fm-message-icon success" />}
                </Flex>
            </FmCard>
        </Flex>
    );
}


export default FmMessage;