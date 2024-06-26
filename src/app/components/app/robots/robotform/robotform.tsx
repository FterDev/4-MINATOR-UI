'use client';

import FmCard from '@/app/components/ui/fmcard/fmcard';
import './robotform.css';
import { Flex } from 'antd';
import FmInput from '@/app/components/ui/fminput/fminput';
import FmButton from '@/app/components/ui/fmbutton/fmbutton';
import { useRouter } from 'next/navigation';


export default function RobotForm()
{

    const router = useRouter();

    return (
        <FmCard className='robot-form-card'>
            <Flex justify='center'>
                <h3>title stuff</h3>
            </Flex>
            <Flex justify='space-between' vertical>
                <FmInput id='robotname' name='robotname' value="" textAlign='center' placeholder='T-800' onChange={() => {}}  title='Robot Name' />
                <FmInput id='robotpassword' name='robotpassword' value="" textAlign='center' placeholder='●●●●●' onChange={() => {}} type='password'  title='Robot Password' />
            </Flex>
            <Flex justify='center'>
                <FmButton className='robot-form-button' text="Cancel" color="danger" onClick={() => {router.push('/game/robots')}} />
                <FmButton className='robot-form-button' text="Save" onClick={() => {}} />
            </Flex>
        </FmCard>
    );
}