'use client';
import FmLobby from "@/app/components/ui/fmlobby/fmlobby";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

 



export default function Lobby()
{


    const sessionData = useSelector((state: any) => state.session);

    const [players, setPlayers] = useState<String>('');
    const [connection, setConnection] = useState<HubConnection | null>(null);

    const backendUrl = process.env.NEXT_PUBLIC_LINK_BACKEND;


    async function requestMatch(playerId: number)
    {
        connection?.invoke("RequestMatch", playerId).catch((err) => console.log(err));
    }


    useEffect(() => {

        const connect = new HubConnectionBuilder()
            .withUrl(backendUrl + "/lobbyHub", {skipNegotiation: false, transport: 1, accessTokenFactory: () => sessionData.token 
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        connect.start().then(() => { 
            
            connect.on("ReceiveWaitingPlayers", (res) => {
                setPlayers(res);
            });

            connect.on("ReceiveMatchRequest", (res) => {
                window.alert("Match request from " + res.nickname);
            });

            
        }).catch((err) => console.log(err));

        return () => {
            if (connection) {
                connection.off("ReceiveWaitingPlayers");
                
            }
        }
        
    }, []);

    
   
    return (
        <FmLobby data={players} requestMatch={requestMatch} />
        
    )
}