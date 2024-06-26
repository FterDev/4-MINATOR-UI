import './fmnavigation.css';
import FmCard from "../fmcard/fmcard";
import { Flex } from 'antd';
import Image from 'next/image';
import FmButton from '../fmbutton/fmbutton';
import FmNavButtonContent from '../fmnavbuttoncontent/fmnavbuttoncontent';
import { PoweroffOutlined, RobotFilled, SettingOutlined, TrophyOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';





interface FmNavigationProps {
    username?: string | null;
    picture: string;
}

let FmNavigation: React.FC<FmNavigationProps> = (props) => {

    
    const router = useRouter();


    return (
        <Flex className='fm-navigation-container' justify='center'>
            <FmCard className='fm-navigation'>
                <Flex className='fm-navigation-header' vertical justify='center' align='center'>
                    <Image src={props.picture} alt="logo" width={0} height={0} sizes="100vw" className='fm-navigation-avatar'  />
                    <h1 className='fm-navigation-title'>Welcome {props.username}!</h1>
                    <h2 className='fm-navigation-subtitle'>What do you want to do?</h2>
                </Flex>
                <Flex className='fm-navigation-body' vertical justify='center'>
                    <FmButton text={
                        <FmNavButtonContent text='Play' icon={<Image src='/img/logo_transparent.png' alt='play' width={0} height={0} sizes='100vw' className='fm-navigation-button-logo'/>}/>                        
                    } className='fm-navigation-button' onClick={() => router.push("/game/lobby")}/>
                    
                    <Flex justify='space-between'>
                        <FmButton color='primary' text={
                            <FmNavButtonContent text='Leaderboard' icon={<TrophyOutlined className='fm-navigation-button-icon' />}/>                        
                        } className='fm-navigation-button' onClick={() => {}} />
                        <FmButton color='primary' text={
                            <FmNavButtonContent text='Settings' icon={<SettingOutlined className='fm-navigation-button-icon' />}/>                        
                        } className='fm-navigation-button' onClick={() => {}} />
                    </Flex>

                    <FmButton color='secondary' text={
                        <FmNavButtonContent text='Sign out' icon={<PoweroffOutlined className='fm-navigation-button-icon' />}/>                        
                    } className='fm-navigation-button' onClick={() => signOut()} />
                </Flex>
            </FmCard>
        </Flex>
        
    );
}

export default FmNavigation;

