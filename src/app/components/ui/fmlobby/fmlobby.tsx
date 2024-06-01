'use client';  
import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import './fmlobby.css'
import FmButton from "../fmbutton/fmbutton";
import FmTable from "../fmtable/fmtable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useSelector } from "react-redux";



export default function FmLobby()
{

    const router = useRouter();
    const sessionData = useSelector((state: any) => state.session);

    const players = [
        {id: 1, name: 'Player 1'},
    ];

    const columns = [
        { key: 'name', title: 'Available Players' },
        
    ];

    
    


    return(
        <FmCard className="fm-lobby-card">
            <Flex className="fm-lobby-options">
                <FmButton text="Back" className="fm-lobby-button" onClick={()=>{router.push('/game/nav')}}/>
            </Flex>
            <div className="fm-lobby-table-wrapper">
                <FmTable className="fm-lobby-table" columns={columns} data={players} ></FmTable>
            </div>
            
            
        </FmCard>
    )
}