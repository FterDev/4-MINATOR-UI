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
    
    const [fieldState, setFieldState] = useState(new Array(cols).fill(new Array(rows).fill(0)));


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
                    <Flex className='fm-field-player'>
                        playerdata 1
                    </Flex>
                    <Flex className='fm-field-game' align='center' justify='center'>
                        {fieldState.map((col, colIndex) => {
                            return (
                                <Flex vertical key={colIndex}>
                                    {col.map((row:number, rowIndex:number) => {
                                        return (
                                            <Flex key={rowIndex} className='fm-field-cell'>
                                                {row}
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )
                        }
                        )}
                    </Flex>
                    <Flex className='fm-field-player'>
                        playerdata 2
                    </Flex>
                </Flex>
                <Flex className='fm-field-header' justify='center' align='center'>
                    <FmButton className='fm-field-button' text={'Joker (2x)'} />
                </Flex>
            </Flex>
        </FmCard>
    )
}
