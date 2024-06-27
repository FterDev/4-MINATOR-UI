'use client';

import { Flex } from "antd";
import FmButton from "../fmbutton/fmbutton";
import FmCard from "../fmcard/fmcard";
import './fmmodal.css';


interface FmModalProps {
    children: React.ReactNode;
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    textOk?: string;
    textCancel?: string;
}

export const FmModal: React.FC<FmModalProps> = ({visible, onOk, onCancel, children, textOk, textCancel}) => {
    return (
        <Flex justify="center" align="center" className={`fm-modal ${visible?'visible':''}`}>
            <FmCard className="fm-modal-card">
                {children}
                <Flex justify="center" align="center" className="fm-modal-buttons">
                    <FmButton text={textCancel != undefined ? textCancel : 'Cancel'} color="danger" onClick={onCancel} />
                    <FmButton text={textOk != undefined ? textOk : 'Ok'} onClick={onOk} />  
                </Flex>
            </FmCard>
        </Flex>
    );
}