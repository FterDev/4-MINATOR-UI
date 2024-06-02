'use client';  
import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import './fmlobby.css'
import FmButton from "../fmbutton/fmbutton";
import FmTable from "../fmtable/fmtable";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { FmLobbyCell } from "../fmlobbycell/fmlobbycell";



interface FmLobbyProps {

    data: any;
    requestMatch: (playerId: number) => void;
}


export default function FmLobby(data: FmLobbyProps)
{

    const [players, setPlayers] = useState<any>([]);
    const router = useRouter();
    
    const playersArray =  Array.from(data.data);

    



    const columns = [
        { key: 'row', title: 'Available Players' },    
    ];


    


    return(
        <FmCard className="fm-lobby-card">
            <Flex className="fm-lobby-options">
                <FmButton text="Back" className="fm-lobby-button" onClick={()=>{router.push('/game/nav')}}/>
            </Flex>
            <div className="fm-lobby-table-wrapper">
                {playersArray.map((player: any) => {
                    return <FmLobbyCell externalId={player.user.externalId} nickname={player.user.nickname} playerId={player.id} request={data.requestMatch} />
                })}
            </div>
            
            
        </FmCard>
        
    )
}