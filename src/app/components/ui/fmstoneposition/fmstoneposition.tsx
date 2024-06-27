'use client';
import { Flex } from 'antd';
import './fmstoneposition.css';

interface FmStonePositionProps {
    color: number;
}



export default function FmStonePosition(stonePositionProps : FmStonePositionProps)
{
    return(
        <Flex justify='center' align='center' className={`fm-stone-position fm-stone-color-${stonePositionProps.color}`} >
            <label>{stonePositionProps.color}</label>
        </Flex>
    )
}