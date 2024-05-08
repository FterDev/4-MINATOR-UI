
import './fmnavbuttoncontent.css';
import { Flex } from "antd";





interface FMNavButtonContentProps {
    text: string;
    icon: React.ReactNode;
}


let FmNavButtonContent: React.FC<FMNavButtonContentProps> = (props) => {
    return (
        <Flex className='fm-nav-button-content' align='center'>
            <label className='fm-nav-button-content-text'>{props.text}</label>
            <div className="fm-nav-button-content-icon">
                {props.icon}
            </div>
        </Flex>
    );
}

export default FmNavButtonContent;