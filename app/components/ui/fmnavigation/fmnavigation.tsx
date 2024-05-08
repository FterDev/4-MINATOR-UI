import './fmnavigation.css';
import FmCard from "../fmcard/fmcard";
import { Flex } from 'antd';
import Image from 'next/image';
import FmButton from '../fmbutton/fmbutton';




interface FmNavigationProps {
    username: string;
    picture: string;
}


let FmNavigation: React.FC<FmNavigationProps> = (props) => {
    return (
        <Flex className='fm-navigation-container' justify='center'>
            <FmCard className='fm-navigation'>
                <Flex className='fm-navigation-header' vertical justify='center' align='center'>
                    <Image src={props.picture} alt="logo" width={0} height={0} sizes="100vw" className='fm-navigation-avatar'  />
                    <h1 className='fm-navigation-title'>Welcome {props.username}!</h1>
                    <h2 className='fm-navigation-subtitle'>What do you want to do?</h2>
                </Flex>
                <Flex className='fm-navigation-body' vertical justify='center'>
                    <FmButton className='fm-navigation-button' text='Start Playing!'/>
                </Flex>
            </FmCard>
        </Flex>
        
    );
}

export default FmNavigation;

