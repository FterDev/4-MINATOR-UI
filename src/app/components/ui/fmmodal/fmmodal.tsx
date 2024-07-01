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
    hideCancel?: boolean;
    hideOk?: boolean;
}

export const FmModal: React.FC<FmModalProps> = ({visible, onOk, onCancel, children, textOk, textCancel, hideCancel = false, hideOk = false}) => {
    return (
        <Flex justify="center" align="center" className={`fm-modal ${visible?'visible':''}`}>
            <FmCard className="fm-modal-card">
                {children}
                <Flex justify="center" align="center" className="fm-modal-buttons">
                    <FmButton className={hideCancel ? 'hide' : ''} text={textCancel != undefined ? textCancel : 'Cancel'} color="danger" onClick={onCancel} />
                    <FmButton className={hideOk ? 'hide' : ''}  text={textOk != undefined ? textOk : 'Ok'} onClick={onOk} />  
                </Flex>
            </FmCard>
        </Flex>
    );
}