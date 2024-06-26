'use client';

import FmCard from '@/app/components/ui/fmcard/fmcard';
import './robotform.css';
import { Flex } from 'antd';
import FmInput from '@/app/components/ui/fminput/fminput';
import FmButton from '@/app/components/ui/fmbutton/fmbutton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HubConnection } from '@microsoft/signalr';

export interface RobotFormProps {
    robotConnection : HubConnection | null;
}


export default function RobotForm(robotConnection : RobotFormProps)
{

    const router = useRouter();
    const connection = robotConnection;

    const [robotName, setRobotName] = useState<string>('');

    return (
        <>
            <Flex justify='center'>
                <h3>title stuff</h3>
            </Flex>
            <Flex justify='space-between' vertical>
                <FmInput id='robotname' name='robotname' value="" textAlign='center' placeholder='T-800' onChange={() => {}}  title='Robot Name' />
                <FmInput id='robotpassword' name='robotpassword' value="" textAlign='center' placeholder='●●●●●' onChange={() => {}} type='password'  title='Robot Password' />
            </Flex>
        </>
    );
}