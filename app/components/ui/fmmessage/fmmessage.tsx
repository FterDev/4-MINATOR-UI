import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";


interface FmMessageProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    children?: React.ReactNode;
}


let FmMessage: React.FC<FmMessageProps> = ({ type, message, children }) => {
    return (
        <Flex justify="center" align="center" className="fm-message-container">
            <FmCard className="fm-message">

            </FmCard>
        </Flex>
    );
}


export default FmMessage;