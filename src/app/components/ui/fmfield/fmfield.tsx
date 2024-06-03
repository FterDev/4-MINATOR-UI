'use client';
import { Flex } from 'antd';
import FmCard from '../fmcard/fmcard';
import './fmfield.css';
import FmButton from '../fmbutton/fmbutton';
import { useState } from 'react';

interface FmFieldProps {

}

export default function FmField(fieldProps : FmFieldProps)
{

    const cols = 7;
    const rows = 6;
    
    const [fieldState, setFieldState] = useState(new Array(rows).fill(new Array(cols).fill(0)));


    return(
        <FmCard className='fm-field-card'>
            <Flex vertical>
                <Flex justify='space-evenly' className='fm-field-header'>
                    <FmButton className='fm-field-button' text={'Help'}></FmButton>
                    <Flex vertical justify='space-between' className='fm-field-header-status'>
                        <label>07:59</label>
                        <label>Hosted by RobotXY</label>
                    </Flex>
                    <FmButton className='fm-field-button' text={'Leave Game'} color='danger'></FmButton>
                </Flex>
                <Flex className='fm-field-main'>
                    <div>
                        playerdata1
                    </div>
                    <div>
                        stones
                    </div>
                    <div>
                        playerdata2
                    </div>
                </Flex>
                <Flex className='fm-field-header' justify='center' align='center'>
                    <FmButton className='fm-field-button' text={'Joker (2x)'} />
                </Flex>
            </Flex>
        </FmCard>
    )
}
