'use client';
import './fmselector.css';




export interface FmSelectorOptions 
{
    key: number;
    value: string;
}


interface FmSelectorProps
{
    options: FmSelectorOptions[];
    selected: number;
    onSelect: (key: number) => void;
}



export default function FmSelector(props: FmSelectorProps)
{
    return (
        <select className="fm-selector" value={props.selected} onChange={(e) => props.onSelect(parseInt(e.target.value))}>
            {props.options.map((option) => <option key={option.key} value={option.key}>{option.value}</option>)}
        </select>
    );
}