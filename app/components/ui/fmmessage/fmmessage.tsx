
import React from "react";

import "./fmmessage.css";

import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import { CancelOutlined, CheckCircleOutline, ErrorOutlineOutlined, InfoOutlined } from "@mui/icons-material";


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
                    {type === 'error' && <CancelOutlined className="fm-message-icon error" />}
                    {type === 'warning' && <ErrorOutlineOutlined className="fm-message-icon warning" />}
                    {type === 'info' && <InfoOutlined className="fm-message-icon" />}
                </Flex>
            </FmCard>
        </Flex>
    );
}


export default FmMessage;